/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatBox from "../../components/ChatBox/ChatBox";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import LiftSidebar from "../../components/LiftSidebar/LiftSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../Features/chatSlice";
import { ja } from "date-fns/locale";

const Chat = () => {
  const { status, users, error } = useSelector((state) => state.users);
  const { chatStatus, chats, chatsError } = useSelector((state) => state.users);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [LSisVisible, setLSisVisible] = useState(true);
  console.log(`selectedFriend:  `, selectedFriend);
  const dispatch = useDispatch();
  const fetchMessages = () => {
    // Fetch messages
    dispatch(fetchChats());
  };

  useEffect(() => {
    fetchMessages();

    // Set up interval
    const interval = setInterval(fetchMessages, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat">
      {!users && !chats && chatStatus === 'Loading' ? (
        <p>Loading</p>
      ) : (
        <div className="chat-container">
          <LiftSidebar
            setSelectedFriend={setSelectedFriend}
            LSisVisible={LSisVisible}
            setLSisVisible={setLSisVisible}
          />
          <ChatBox
            selectedFriend={selectedFriend}
            setLSisVisible={setLSisVisible}
            LSisVisible={LSisVisible}
          />
          <RightSidebar selectedFriend={selectedFriend} />
        </div>
      )}
    </div>
  );
};

export default Chat;
