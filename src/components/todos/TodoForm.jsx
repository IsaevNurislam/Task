import React, { useState } from "react";
import styled from "styled-components";
import { useTodo } from "./context/TodoContext";

const TodoForm = () => {
  const { addTodo } = useTodo();

  const [enteredValue, setEnteredValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const inputHandler = (e) => {
    setEnteredValue(e.target.value);
    setIsValid(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (enteredValue.trim() === "") {
      setIsValid(false);
      return;
    }

    addTodo(enteredValue);
    setEnteredValue("");
  };

  return (
    <TodoFormContainer>
      <form onSubmit={submitHandler}>
        <Input
          type="text"
          value={enteredValue}
          onChange={inputHandler}
          placeholder="Enter new todo..."
        />
        <Button type="submit">Submit</Button>
      </form>
      {!isValid && <ErrorMessage>Поле не должно быть пустым</ErrorMessage>}
    </TodoFormContainer>
  );
};

export default TodoForm;

const TodoFormContainer = styled.div`
  margin-bottom: 30px;

  form {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
  }
`;

const Input = styled.input`
  width: 45%;
  height: 30px;
  font-size: 1.3rem;
  padding: 25px 15px;
  border: none;
  border-radius: 5px;
  outline: none;
  display: inline-block;
`;

const Button = styled.button`
  margin-left: 20px;
  height: 50px;
  cursor: pointer;
  background-color: coral;
  color: white;
  font-size: 1rem;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-top: 5px;
`;
