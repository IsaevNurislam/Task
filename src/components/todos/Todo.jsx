import React from "react";
import styled, { css } from "styled-components";
import { useTodo } from "./context/TodoContext";

const Todo = ({ todo }) => {
  const { deleteTodo, toggleCompletedTodo, editTodo } = useTodo();

  const isCompleted = todo.isCompleted;

  return (
    <TodoContainer $completed={isCompleted} className="todo">
      <TodoIcon />
      <TodoText>{todo.text}</TodoText>
      <Delete onClick={() => deleteTodo(todo.id)}>Delete</Delete>
      <Check onClick={() => toggleCompletedTodo(todo)}>Check</Check>
      <Edit onClick={() => editTodo(todo.id, todo.text)}>Edit</Edit>
    </TodoContainer>
  );
};

export default Todo;

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin: 15px 0;
  font-size: 1.5rem;
  border-radius: 5px;
  border: 2px solid #555;
  color: #112d49;
  background-color: #fbfef9;
  width: 100%;

  ${({ $completed }) =>
    $completed &&
    css`
      background-color: black;
      border-color: gray;
      color: gray;
    `}
`;

const TodoText = styled.div`
  width: 100%;
  text-align: left;
`;

const TodoIcon = styled.span`
  font-size: 1.8rem;
  margin-right: 10px;
  color: teal;
`;

const Check = styled.span`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 12px;
  transition: transform 0.3s;
  &:hover {
    cursor: pointer;
    color: green;
  }
`;

const Delete = styled.span`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  font-size: 12px;
  transition: transform 0.3s;

  &:hover {
    cursor: pointer;
    color: red;
  }
`;

const Edit = styled.span`
  cursor: pointer;
  color: lightgrey;
  padding: 0 7px;
  transition: transform 0.3s;
  font-size: 12px;

  &:hover {
    cursor: pointer;
    color: orange;
  }
`;
