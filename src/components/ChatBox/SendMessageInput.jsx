/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { getUploadFileURL } from "../../config/firbaseUtility";
import { db } from "../../config/firebase";
import { addDoc, collection, doc, increment, setDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { fetchChats } from "../../Features/chatSlice";
import { fetchUsers } from "../../Features/userSlice";

const SendMessageInput = ({
  selectedFriend,
  signInUser,
  setSentMessage,
  sentMessage,
}) => {
  const [receiver, setReceiver] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const dispatch = useDispatch();

  // console.log(`SelectedFriend: `, selectedFriend.id);
  // console.log(`SignInUser: `, signInUser);

  const sendMessageHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const chatId = [signInUser?.id, selectedFriend?.id].sort().join("_");
    e.target.reset();
    await setDoc(doc(db, "chats", chatId), {
      participants: [signInUser.id, selectedFriend.id], // Replace with actual user IDs
      lastMessage: img ? null : msg,
      lastImg: img || null,
      lastMessageTimestamp: Date.now(),
      lastMessageId: null,
      isGroup: false, // Adjust based on whether it’s a group chat
    }, { merge: true }); 

    const newMessageRef = await addDoc(collection(db, "chats", chatId, "messages"), {
      senderId: signInUser.id,
      content: img ? null : msg,
      timestamp: Date.now(),
      type: img ? "image" : "text",
      img: img || null
    });

    const newMessageId = newMessageRef.id; // Get the ID of the newly created message
    console.log("New message ID:", newMessageId);

    await updateDoc(doc(db, "chats", chatId), {
      lastMessageId: newMessageId,
      [`unreadCount.${selectedFriend?.id}`]: increment(1),
      mediaCount: img ? increment(1) : increment(0)
    });

    setImg("");
    setMsg("");
    dispatch(fetchChats());
    setIsLoading(false);
  };

  const changeFileHandler = async ({ target }) => {
    const file = target.files[0];
    setIsUploading(true);
    try {
      if (file) {
        const fileURL = await getUploadFileURL(file);
        setImg(fileURL);
      }
    } catch (error) {
      console.error("Error Occurred Making URL: ", error);
    }
    setIsUploading(false);
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
        {isUploading ? (
          <div className="loader"></div>
        ) : (
          <img
            className="chat-gallery-icon"
            src={assets.gallery_blue_icon}
            alt=""
          />
        )}
      </label>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <button type="submit" disabled={!msg && !img}>
          <img
            className={`chat-send-icon ${
              !msg && !img ? "opacity-60 cursor-no-drop" : "cursor-pointer"
            }`}
            src={assets.send_button}
            alt=""
          />
        </button>
      )}
    </form>
  );
};

export default SendMessageInput;
