import React from "react";
import './ImgModal.css'
import assets from "../../assets/assets";
import { useImgModal } from "./imgModalContext";

const ImgModal = () => {
  const { modalData, hideModal } = useImgModal();

  if (!modalData.visible) return null;

  return (
    <div className="modal-overlay" onClick={hideModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={hideModal}>
          <img src={assets.cross_icon} alt="" />
        </button>
        <img src={modalData.image} alt="Zoomed In" className="modal-image" />
      </div>
    </div>
  );
};

export default ImgModal;
