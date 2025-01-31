import React, { createContext, useContext, useState } from "react";
import PasswordModal from "./PasswordModal";

const delModalContext = createContext();

export const DelModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onSubmit, setOnSubmit] = useState(() => () => {});
  const [title, setTitle] = useState("");

  const openModal = (newTitle, submitHandler) => {
    setTitle(newTitle);
    setOnSubmit(() => submitHandler);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitle("");
    setOnSubmit(() => () => {});
  };

  return (
    <delModalContext.Provider value={{ isModalOpen, openModal, closeModal, title, onSubmit }}>
      {children}
      {isModalOpen && <PasswordModal />}
    </delModalContext.Provider>
  );
};

export const useDelModal = () => useContext(delModalContext);
