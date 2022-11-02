import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker } from "antd";
import axios from "axios";
import moment from "moment";
import Card from "../../../Components/Card";
import locale from "antd/es/date-picker/locale/ru_RU";
import "moment/locale/ru";

const RegisterForm = () => {
  const navigate = useNavigate();
  const onFinish = async ({ email, password, name, datePicker }) => {
    try {
      const age = moment().diff(datePicker, "years");
      await axios.post(
        "https://api-nodejs-todolist.herokuapp.com/user/register",
        { email, password, name, age }
      );
      navigate("/login");
    } catch (er) {
      console.log(er);
    }
  };
  const checkPassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Пароли не совпадают!"));
    },
  });
  const checkPasswordLength = () => ({
    validator(_, value) {
      if (!value || value.length > 6) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("Пароль должен содержать 7 и более символов")
      );
    },
  });

  return (
    <Card margin="100px auto">
      <Form name="register" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Укажите корректный адрес электронной почты",
            },
            {
              required: true,
              message: "Укажите вашу почту",
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Укажите ваш пароль",
            },
            checkPasswordLength,
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Подтвердите ваш пароль",
            },
            checkPassword,
          ]}
        >
          <Input.Password placeholder="Подтвердите пароль" />
        </Form.Item>

        <Form.Item
          name="name"
          tooltip="Как вас зовут?"
          rules={[
            {
              required: true,
              message: "Укажите ваше имя",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="Имя" />
        </Form.Item>
        <Form.Item
          name="datePicker"
          rules={[
            {
              required: true,
              message: "Укажите дату рождения",
            },
          ]}
        >
          <DatePicker
            placeholder="Дата рождения"
            locale={locale}
            format="DD.MM.YYYY"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterForm;
