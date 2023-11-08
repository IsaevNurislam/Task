import React, { useState } from "react";
import styled from "styled-components";
import ReactDOM from "react-dom";
import { useTodo } from "./context/TodoContext";

const EditModal = () => {
  const { editTodo, selectedTodo, closeEditModal, editModalOpen } = useTodo();
  const [newText, setNewText] = useState("");

  if (!editModalOpen) {
    return null;
  }
  const onChange = (e) => {
    setNewText(e.target.value);
  };

  const saveTodo = () => {
    editTodo(selectedTodo.id, newText);
    closeEditModal();
  };

  return ReactDOM.createPortal(
    <>
      <OverlayStyles />
      <ModalCon>
        <div>
          <h2>EditModal</h2>
          <input type="text" value={newText} onChange={onChange} />
          <ModalButtons>
            <ButtonSave onClick={saveTodo}>Save</ButtonSave>
            <ButtonCancel onClick={closeEditModal}>Cancel</ButtonCancel>
          </ModalButtons>
        </div>
      </ModalCon>
    </>,
    document.getElementById("modal")
  );
};

export default EditModal;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  button {
    border: none;
    width: 5rem;
    height: 2rem;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
  }
`;

const ButtonSave = styled.button`
  background-color: green;
`;

const ButtonCancel = styled.button`
  background-color: red;
`;

const ModalCon = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px;
  z-index: 1000;
  color: #000;
  text-align: center;
  h2 {
    margin-bottom: 1.6rem;
  }
  input {
    width: 12.5rem;
    height: 2rem;
    padding: 0.5rem;
  }
  border: 1px solid #000;
  border-radius: 20px;
`;

const OverlayStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
