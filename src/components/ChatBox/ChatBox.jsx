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

// eslint-disable-next-line react/prop-types
const ChatBox = ({ selectedFriend, setLSisVisible, LSisVisible }) => {
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

  // useMessageNotifications(authUser, receiver);

  useEffect(() => {
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
      if (bottomRef.current) {
        // setTimeout(() => {
        //   bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        // }, 2000);
      }
    }
  }, [selectedFriend, chatsStatus, chats]);

  // if (status === "loading" && chatsStatus !== "succeeded") {
  //   return <div className="flex items-center justify-center ">loading</div>;
  // }
  if (!chatAbout && !chatMessages && !selectedFriend) {
    return (
      <div className="flex items-center justify-center flex-col h-[100vh]">
        {" "}
        <img className="max-w-40 opacity-90" src={assets.logo_icon} alt="" />
        <h2 className="text-[#333]"> Welcome to Chat-App </h2>
        <p className="text-gray-400 text-xs text-center px-2">
          App made by Unknown one Select User To Chat with him
        </p>
        <p
          onClick={() => setLSisVisible(!LSisVisible)}
          className="bg-[#0289cc] text-white px-6 py-2 rounded-full mt-6"
        >
          chat-App
        </p>
      </div>
    );
  } else {
    return (
      <div className="chat-box">
        {/* ---- Chat_Top_User_Bio -----*/}
        <SelectedFriendBio assets={assets} selectedFriend={receiver} />
        {/* ---- Chatting-Of-User ----- */}

        <div className="chat-message" ref={chatContainerRef}>
          {/* {console.log(chatMessages)} */}
          {!chatMessages ? (
            chatMessages === null ? (
              <div className="flex items-center justify-center h-full text-sm flex-col text-gray-700">
                {" "}
                <img
                  className="max-w-32 max-h-32"
                  src={assets.logo_icon}
                  alt=""
                />
                chat with this Friend
              </div>
            ) : (
              <div>
                <div>chats Uploading...</div>
              </div>
            )
          ) : (
            chatMessages.map((msg, index) => (
              <div key={msg.id || index}>
                {/* {console.log("Message is here: ", msg)} */}
                {/* Add a unique key for each element */}
                {/* --- Sender Messages or Receiver Messages --- */}
                {msg.senderId === authUser.uid ? ( // Check if the message is from the sender
                  <>
                    {msg.type === "text" ? (
                      <SenderMsg
                        assets={assets}
                        signInUser={signInUser}
                        msg={msg}
                        deleteMsg={sentMessage}
                        setDeleteMsg={setSentMessage}
                        chatAbout={chatAbout}
                      />
                    ) : (
                      <SenderImage
                        assets={assets}
                        signInUser={signInUser}
                        msg={msg}
                        deleteMsg={sentMessage}
                        setDeleteMsg={setSentMessage}
                        chatAbout={chatAbout}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {msg.type === "text" ? (
                      <ReceiverMsg
                        assets={assets}
                        selectedFriend={receiver}
                        msg={msg}
                        deleteMsg={sentMessage}
                        setDeleteMsg={setSentMessage}
                        chatAbout={chatAbout}
                      />
                    ) : (
                      <ReceiverImage
                        assets={assets}
                        selectedFriend={receiver}
                        msg={msg}
                        deleteMsg={sentMessage}
                        setDeleteMsg={setSentMessage}
                        chatAbout={chatAbout}
                      />
                    )}
                  </>
                )}
              </div>
            ))
          )}

          <button
            onClick={() => setLSisVisible(!LSisVisible)}
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
