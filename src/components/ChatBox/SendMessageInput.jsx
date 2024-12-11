/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import assets from "../../assets/assets";

const SendMessageInput = () => {
  const [img, setImg] = useState('')
  const [msg, setMsg] = useState('')

  const sendMessageHandler = () => {};
  const selectFileHandler = ({target})=> {
    console.log(target.value)
  }

  return (
    <form onSubmit={sendMessageHandler} className="chat-send-input">
      <input type="text" placeholder="Type a message..." />
      <label htmlFor="gallery">
        <input type="file" id="gallery" value={img || msg}  accept=".png, .jpg, .jpeg" onChange={selectFileHandler} hidden />
        <img className="chat-gallery-icon"src={assets.gallery_icon} alt="" />
      </label>
      <button type="submit">
        <img className="chat-send-icon" src={assets.send_button} alt="" />
      </button>
    </form>
  );
};

export default SendMessageInput;
