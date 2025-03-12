/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { getUploadFileURL, uploadVideoToCloudinary } from "../../config/firbaseUtility";
import { db } from "../../config/firebase";
import {
  addDoc,
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { fetchChats } from "../../Features/chatSlice";
import { fetchUsers } from "../../Features/userSlice";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

const SendMessageInput = ({
  selectedFriend,
  signInUser,
}) => {
  // const [receiver, setReceiver] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [img, setImg] = useState("");
  const [msg, setMsg] = useState("");
  const [video, setVideo] = useState("");
  // const [lastMessage, setLastMessage] = useState("");
  const dispatch = useDispatch();

  // console.log(`SelectedFriend: `, selectedFriend.id);
  // console.log(`SignInUser: `, signInUser);

  const sendMessageHandler = async (e) => {
    console.log("Sending message...");
    setIsLoading(true);
    e.preventDefault();
    const chatId = [signInUser?.id, selectedFriend?.id].sort().join("_");
    e.target.reset();
    await setDoc(
      doc(db, "chats", chatId),
      {
        participants: [signInUser.id, selectedFriend.id], // Replace with actual user IDs
        lastMessage: msg || null,
        lastImg: img || null,
        lastVideo: video || null,
        lastMessageTimestamp: Date.now(),
        lastMessageId: null,
        isGroup: false, // Adjust based on whether it’s a group chat
      },
      { merge: true }
    );

    console.log("video url: ", video);

    const newMessageRef = await addDoc(
      collection(db, "chats", chatId, "messages"),
      {
        senderId: signInUser.id,
        content: (img || video) ? null : msg,
        timestamp: Date.now(),
        type: img ? "image" : (video ? "video": "text"),
        img: img || null,
        video: video || null,
      }
    );

    console.log("uploaded message: ", newMessageRef);

    const lastMsgId = newMessageRef.id; // Get the ID of the newly created message

    await updateDoc(doc(db, "chats", chatId), {
      lastMessageId: lastMsgId,
      [`unreadCount.${selectedFriend?.id}`]: increment(1),
      mediaCount: img  || video ? increment(1) : increment(0),
    });

    setImg("");
    setMsg("");
    setVideo("");
    dispatch(fetchChats());
    setIsLoading(false);
  };

  const changeFileHandler = async ({ target }) => {
    const file = target.files[0];
    setIsUploading(true);
    try {
      if (file) {
        if (file.type.startsWith("image/")) {
          const imgURL = await getUploadFileURL(file);
          setImg(imgURL);
        } else if (file.type.startsWith("video/")) {
          const videoURL = await uploadVideoToCloudinary(file);
          setVideo(videoURL);
        } else {
          toast.error("Unsupported file type.");
        }
      }
    } catch (error) {
      console.error("Error Occurred Making URL: ", error);
    }
    setIsUploading(false);
  };

  // useEffect(()=> {

  // }, [status])

  return (
    <form onSubmit={sendMessageHandler} className="chat-send-input z-50">
      {img || video ? (
        <span
          className={`flex-1 ` + (img || video ? "cursor-not-allowed" : " ")}
        >
          <img
            className="max-w-5 absolute cursor-pointer"
            title="Remove"
            onClick={() => img ? setImg(""): setVideo("")}
            src={assets.cross_icon}
            alt=""
          />
          
            <img
              className="max-w-12 max-h-12 min-w-11 rounded-sm"
              src={img ? img : (video ? assets.video_icon2 : assets.avatar_icon)}
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
      {/* <div className="flex flex-shrink-0 gap-"> */}
      <label className="flex-shrink-0" htmlFor="gallery">
        <input
          type="file"
          id="gallery"
          accept=".png, .jpg, video/*"
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
        <button className="flex-shrink-0" type="submit" disabled={!msg && !img && !video}>
          <img
            className={`chat-send-icon ${
              !msg && !img && !video ? "opacity-60 cursor-no-drop" : "cursor-pointer"
            }`}
            src={assets.send_button}
            alt=""
          />
        </button>
      )}
      {/* </div> */}
    </form>
  );
};

export default SendMessageInput;
