import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const TodoApp = () => {
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoForm />
       <TodoList />
    </div>
  );
};

export default TodoApp;
