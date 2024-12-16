/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { getUploadFileURL } from "../../config/firbaseUtility";
import { db } from "../../config/firebase";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

const SendMessageInput = ({selectedFriend, signInUser, setSentMessage, sentMessage}) => {


  const [receiver, setReceiver] = useState(null)
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState("");
  const [lastMessage, setLastMessage] = useState('')



  const sendMessageHandler = async (e) => {
    e.preventDefault()
    const chatId = [signInUser.id, selectedFriend.id].sort().join("_");;


    await setDoc(doc(db, 'chats', chatId), {
      participants: [signInUser.id, selectedFriend.id], // Replace with actual user IDs
      lastMessage: img ? null : msg,
      lastImg : img || null,
      lastMessageTimestamp: Date.now(),
      isGroup: false, // Adjust based on whether it’s a group chat
    });

    await addDoc(
      collection(db, 'chats' , chatId, 'messages'),
      {
        senderId: signInUser.id,
        content: img ? null : msg,
        timestamp: Date.now(),
        type: img ? "image" : "text",
        img: img || null,
      }
    );

    setImg("")
    setMsg("")
    e.target.reset()
    setSentMessage(!sentMessage)
}

  const changeFileHandler = async ({ target }) => {
    const file = target.files[0];
    try {
      if (file) {
        const fileURL = await getUploadFileURL(file);
        setImg(fileURL);
      }
    } catch (error) {
      console.error("Error Occurred Making URL: ", error);
    }
  };

  // useEffect(()=> {

  // }, [status])

  return (
    <form onSubmit={sendMessageHandler} className="chat-send-input">
      {img ? (
        <span className={`flex-1 ` + (img ? "cursor-not-allowed" : " ")}>
          {" "}
          <img
            className="max-w-5 absolute cursor-pointer"
            onClick={() => setImg("")}
            src={assets.cross_icon}
            alt=""
          />{" "}
          <img
            className="max-w-12 max-h-12 rounded-sm"
            src={img || assets.avatar_icon}
          />
        </span>
      ) : (
        <input
          type="text"
          placeholder="Type a message..."
          onChange={({ target }) => setMsg(target.value)}
          disabled={img}
        />
      )}
      <label htmlFor="gallery">
        <input
          type="file"
          id="gallery"
          accept=".png, .jpg, .jpeg"
          onChange={changeFileHandler}
          hidden
        />
        <img className="chat-gallery-icon" src={assets.gallery_icon} alt="" />
      </label>
      <button type="submit">
        <img className="chat-send-icon" src={assets.send_button} alt="" />
      </button>
    </form>
  );
};

export default SendMessageInput;
