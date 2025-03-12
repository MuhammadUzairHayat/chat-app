/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
import { useSelector } from "react-redux";
// import BookLoaderComponent  from "../../Pages/ProfileUpdate/Loader";
import SenderMsg from "./SenderMsg";
import SenderImage from "./SenderImage";
import ReceiverMsg from "./ReceiverMsg";
import ReceiverImage from "./ReceiverImage";
import { AuthContext } from "../../context/AuthContext";
import SelectedFriendBio from "./SelectedUser";
import SendMessageInput from "./SendMessageInput";
import { getMessages } from "../../config/firbaseUtility";
import { set } from "date-fns";
import { se } from "date-fns/locale";
import { useMessageNotifications } from "../../hooks/useMessageNotification";
import ChatDefaultView from "./ChatDefaultView";
import SenderChatting from "./SenderChatting";
import ReceiverChatting from "./ReceiverChatting";
import UserNoChat from "./UserNoChat";
import ImgModal from "../../context/ImageModal/ImgModal";
import ImgToShow from "../../context/ImageModal/ImgToShow";

// eslint-disable-next-line react/prop-types
const ChatBox = ({
  selectedFriend,
  setLSisVisible,
  LSisVisible,
  setRSisVisible,
}) => {
  
  // ---- Stored Data ----
  const { authUser } = useContext(AuthContext);
  const [receiver, setReceiver] = useState(null);
  const [chatAbout, setChatAbout] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [sentMessage, setSentMessage] = useState(true);
  const [signInUser, setSignInUser] = useState(null);
  const { status, users, error } = useSelector((state) => state.users);
  const { chatsStatus, chats, chatsError } = useSelector(
    (state) => state.chats
  );
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // ---- Setting Receiver Data ----
    if (chatsStatus === "succeeded" && selectedFriend) {
      const result = users.find((user) => user.id === authUser.uid);
      setSignInUser(result);
      const gettingChat = chats.find(
        (chat) =>
          chat?.participants.includes(authUser.uid) &&
          chat?.participants.includes(selectedFriend?.user?.id)
      );
      setReceiver(selectedFriend.user);
      setChatAbout(gettingChat || null);
      setChatMessages(gettingChat?.messages || null);
      // if (bottomRef.current) {
      //   setTimeout(() => {
      //     bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      //   }, 2000);
      // }
    }
  }, [selectedFriend, chatsStatus, chats]);

  if (!chatAbout && !chatMessages && !selectedFriend) {
    return (
      // ---- ChatBox Default View ----
      <ChatDefaultView assets={assets} setLSisVisible={setLSisVisible} />
    );
  } else {
    return (
      <div className="chat-box">
        {/* ---- ChatBox Receiver Info -----*/}
        <SelectedFriendBio
          assets={assets}
          selectedFriend={receiver}
          setLSisVisible={setLSisVisible}
          setRSisVisible={setRSisVisible}
        />

        {/* ---- ChatBox All Chats ----- */}
        <div className="chat-message" ref={chatContainerRef}>
          {!chatMessages ? (
            // ---- User Having No chat View ----
            <UserNoChat chatMessages={chatMessages} />
          ) : (
            chatMessages.map((msg, index) => (
              <div key={msg.id || index}>
                {/* --- Check Messages if from Receiver OR Sender --- */}
                {msg.senderId === authUser.uid ? (
                  // ---- Sender Chatting ----
                  <SenderChatting
                    signInUser={signInUser}
                    chatAbout={chatAbout}
                    msg={msg}
                  />
                ) : (
                  // ---- Receiver Chatting ----
                  <ReceiverChatting
                    receiver={receiver}
                    msg={msg}
                    chatAbout={chatAbout}
                  />
                )}
              </div>
            ))
          )}
          <button 
            onClick={() => {
              setLSisVisible(!LSisVisible);
              setRSisVisible(true);
            }}
            className="start_chat_btn"
          >
            <img src={assets.logo_icon} alt="" />
          </button>
          {/* Invisible div to scroll into view */}
          <div ref={bottomRef} className="">
            {" "}
          </div>
        </div>

        {/* ----- Send_Message_Input ------ */}
        <SendMessageInput
          selectedFriend={receiver}
          signInUser={signInUser}
          sentMessage={sentMessage}
          setSentMessage={setSentMessage}
        />
      </div>
    );
  }
};

export default ChatBox;
