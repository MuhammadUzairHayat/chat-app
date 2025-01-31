import React, { createContext, useState, useContext } from "react";
import ImgModal from "./ImgModal";

const ImgModalContext = createContext();

export const ImgModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({ visible: false, image: null });

  const showModal = (image) => {
    setModalData({ visible: true, image });
  };

  const hideModal = () => {
    setModalData({ visible: false, image: null });
  };

  return (
    <ImgModalContext.Provider value={{ modalData, showModal, hideModal }}>
      {children}
      <ImgModal />
    </ImgModalContext.Provider>
  );
};

export const useImgModal = () => useContext(ImgModalContext);
