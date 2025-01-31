import React from "react";
import { useImgModal } from "./imgModalContext";
import './ImgModal.css'
import assets from "../../assets/assets";

const ImgModal = () => {
  const { modalData, hideModal } = useImgModal();

  if (!modalData.visible) return null;

  return (
    <div className="modal-overlay" onClick={hideModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={modalData.image} alt="Zoomed In" className="modal-image" />
        <button className="modal-close" onClick={hideModal}>
          <img src={assets.cross_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default ImgModal;
