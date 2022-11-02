import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Input, Button } from "antd";
import axios from "axios";
import Card from "../../../../Components/Card";

const LoginForm = () => {
  const navigate = useNavigate();
  const onFinish = async ({ email, password }) => {
    try {
      await axios.post("https://api-nodejs-todolist.herokuapp.com/user/login", {
        email,
        password,
      });
      navigate("/main");
    } catch (e) {
      console.log(`неверно ${e}`);
    }
  };
  return (
    <Card width="500px" margin="100px auto">
      <Form name="basic" autoComplete="off" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Укажите корректный адрес электронной почты",
            },
            {
              required: true,
              message: "Укажите свою почту",
            },
          ]}
        >
          <Input placeholder="email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Укажите свой пароль" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Войти
          </Button>
          Или <Link to="/register">Зарегистрироваться</Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
