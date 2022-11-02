import React, { useState } from "react";
import { Button, Checkbox, Modal, Space, Popover, Input } from "antd";
import { EditOutlined, DeleteOutlined, CheckOutlined } from "@ant-design/icons";
import "./main.css";

const PopoverContent = ({ text, editTask, id }) => {
  const [value, setValue] = useState(text);
  const onEdit = () => {
    if (value !== text) {
      editTask(value, id);
    }
  };
  return (
    <div className="popover-content">
      <Input value={value} onChange={(event) => setValue(event.target.value)} />
      <Button onClick={() => onEdit()}>
        <CheckOutlined />
      </Button>
    </div>
  );
};

const Task = ({ text, id, isChecked, onClick, onCheck, editTask }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <div className="task">
      <Checkbox onChange={() => onCheck(id)} checked={isChecked} />
      <p className="task-text">{text}</p>
      <Space>
        <Button onClick={() => setIsModalVisible(true)} type="primary" danger>
          <DeleteOutlined />
        </Button>
        <Popover
          title="Изменить задачу"
          placement="right"
          content={() => (
            <PopoverContent text={text} editTask={editTask} id={id} />
          )}
        >
          <Button type="default">
            <EditOutlined />
          </Button>
        </Popover>
      </Space>
      <Modal
        visible={isModalVisible}
        onOk={() => onClick(id)}
        onCancel={() => setIsModalVisible(false)}
        cancelText="Отменить"
        okText="Удалить"
      >
        <p>Вы точно уверены что хотите удалить эту заметку?</p>
      </Modal>
    </div>
  );
};

export default Task;
