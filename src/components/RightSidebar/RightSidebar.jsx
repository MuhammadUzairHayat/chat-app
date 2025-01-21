/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const RightSidebar = ({ selectedFriend }) => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { status, users, error } = useSelector((state) => state.users);
  const { chatsStatus, chats, chatsError } = useSelector(
    (state) => state.chats
  );
  const [receiver, setReceiver] = useState(null);
  const [chatAbout, setChatAbout] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [magnifyImage, setMagnifyImage] = useState(false);
  // Update state when `users` changes

  useEffect(() => {
    if (chatsStatus === "succeeded" && selectedFriend) {
      const gettingChat = chats.find(
        (chat) => chat.id === selectedFriend?.chats?.id
      );
      // console.log(`Getting Chat: `, gettingChat);
      setReceiver(selectedFriend.user);
      setChatAbout(gettingChat || null);
      // console.log(`slecetedFriend User : `, selectedFriend.user.id);
      setChatMessages(gettingChat?.messages || null);
    }
  }, [selectedFriend, chatsStatus, chats]);

  // if (status !== "succeeded" && !receiver && !chatMessages && !chatAbout) {
  //   return <div className="flex items-center justify-center">Loading ...</div>;
  // }
  return (
    <div className="rs">
      {/* {console.log(`Selected Friend: `, selectedFriend)} */}
      {/* {console.log(`receiver: `, receiver)} */}
      {/* {console.log(`chatMessages: `, chatMessages )} */}
      <div className="rs-user-bio">
        <img
          className="rs-bio-img"
          src={
            !receiver
              ? assets.logo_icon
              : receiver?.avatar || assets.avatar_icon
          }
          alt=""
        />
        <h3 className="rs-bio-name">
          {!receiver
            ? `Chat-App`
            : receiver?.username
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ") || "User Name"}
          {receiver && <span className="chat-user-status">online</span>}
        </h3>

        <p className="rs-bio-desc">
          {!receiver
            ? `Welcome! Make your Friends Here 😊`
            : receiver?.bio || `Hey, I'm using chat-app 😊`}
        </p>
      </div>

      <div className="rs-media">
        <h4>Media</h4>
        <div className="rs-media-items">
          {chatMessages ? (
            chatMessages.map((message, index) => {
              return message.type === "image" ? (
                <img
                  key={index}
                  className={
                    "rs-media-img " + (magnifyImage ? "absolute z-[50000]" : "")
                  }
                  src={message?.img}
                  alt=""
                  onClick={() => setMagnifyImage(!magnifyImage)}
                />
              ) : null;
            })
          ) : (
            <div className="col-span-3 flex flex-col items-center justify-center w-full ">
              <img src={assets.media_icon} alt="" />
              <p className="text-gray-200 mt-4 text-sm">This is Your Media</p>
            </div>
          )}
        </div>

        <div className="rs-logout-div">
          <button
            className="rs-logout-btn rounded-full shadow-lg"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
