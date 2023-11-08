import React from "react";
import Todo from "./Todo";
import styled from "styled-components";
import { useTodo } from "./context/TodoContext";

const TodoList = () => {
  const { todos } = useTodo();
  console.log(todos);

  return (
    <TodoListContainer>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </TodoListContainer>
  );
};

export default TodoList;

const TodoListContainer = styled.div`
  padding: 10px;
`;
