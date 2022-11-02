import React, { useState } from "react";
import Task from "../Task";
import Card from "../../../../Components/Card";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import "../../../../App.css";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const editTask = (text, id) => {
    setTasks((prevState) =>
      prevState.map((el) =>
        el.id === id ? { text, id: el.id, isChecked: el.isChecked } : el
      )
    );
  };

  const toggleCheck = (id) => {
    setTasks((prevState) =>
      prevState.map((el) =>
        el.id === id
          ? { text: el.text, id: el.id, isChecked: !el.isChecked }
          : el
      )
    );
  };
  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((el) => id !== el.id));
  };
  const createTask = (text) => {
    if (inputValue.trim()) {
      setTasks((prevState) => [
        ...prevState,
        { text, id: Date.now(), isChecked: false },
      ]);
      setInputValue("");
    }
  };
  return (
    <Card margin="200px auto">
      <div className="add-todo-wrapper">
        <Input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          size="small"
          onPressEnter={() => createTask(inputValue)}
        />
        <Button onClick={() => createTask(inputValue)} type="primary">
          Добавить
        </Button>
      </div>
      <div className="tasks">
        {tasks.map(({ text, id, isChecked }) => {
          return (
            <Task
              key={id}
              text={text}
              id={id}
              isChecked={isChecked}
              onClick={deleteTask}
              onCheck={toggleCheck}
              editTask={editTask}
            />
          );
        })}
      </div>
    </Card>
  );
};

export default Todo;
