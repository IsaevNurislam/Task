import React, { createContext, useContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import EditModal from "../EditModal";

export const TodoContext = createContext();

const BASE_URL = "https://todo-list-19e36-default-rtdb.firebaseio.com";

const initialState = {
  todos: [],
  editModalOpen: false,
  selectedTodo: null,
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            text: action.payload,
            isCompleted: false,
            id: uuidv4(),
          },
        ],
      };
    case "OPEN_EDIT_MODAL":
      return { ...state, editModalOpen: true, selectedTodo: action.payload };
    case "CLOSE_EDIT_MODAL":
      return { ...state, editModalOpen: false, selectedTodo: null };
    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              text: action.payload.newText,
            };
          }
          return todo;
        }),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case "TOGGLE_COMPLETED":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };
    case "EDIT_TODO":
      return {
        ...state,
        editModalOpen: true,
        selectedTodo: action.payload,
      };
    default:
      return state;
  }
};

export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { editModalOpen, selectedTodo } = state;
  console.log(state);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/todo.json`);
      const data = await res.json();

      console.log(data, "data");

      let newArray = [];

      for (const key in data) {
        newArray.push({
          id: key,
          text: data[key].text,
        });
      }

      dispatch({ type: "GET_TODOS", payload: newArray });
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      await fetch(`${BASE_URL}/todo.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newTodo,
          isCompleted: false,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    fetchTodos()
  };

  const openEditModal = (todo) => {
    dispatch({ type: "OPEN_EDIT_MODAL", payload: todo });
  };

  const closeEditModal = () => {
    dispatch({ type: "CLOSE_EDIT_MODAL" });
  };
  const updateTodoHandler = (id, newText) => {
    dispatch({ type: "UPDATE_TODO", payload: { id, newText } });
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${BASE_URL}/todo/${id}.json`, {
        method: "DELETE",
      });
      dispatch({ type: "DELETE_TODO", payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const toggleCompletedTodo = async (todo) => {
    try {
      await fetch(`${BASE_URL}/todo/${todo.id}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, isCompleted: !todo.isCompleted }),
      });
      dispatch({ type: "TOGGLE_COMPLETED", payload: todo.id });
    } catch (error) {
      console.error(error);
    }
  };

  const editTodo = async (todo, newTitle) => {
    try {
      const response = await fetch(`${BASE_URL}/todo/${todo.id}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, title: newTitle }),
      });
      if (response.ok) {
        dispatch({
          type: "EDIT_TODO",
          payload: { id: todo.id, newTitle },
        });
      } else {
        throw new Error("Failed to edit todo");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        editModalOpen,
        selectedTodo,
        addTodo,
        deleteTodo,
        toggleCompletedTodo,
        editTodo,
        updateTodoHandler,
        closeEditModal,
        openEditModal,
      }}
    >
      {children}
      {state.editModalOpen && <EditModal />}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("Error: TodoContext not found.");
  }
  return context;
};
