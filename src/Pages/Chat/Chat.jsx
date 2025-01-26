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
  
  // Data Stored
  const { status, users, error } = useSelector((state) => state.users);
  const { chatStatus, chats, chatsError } = useSelector((state) => state.users);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [LSisVisible, setLSisVisible] = useState(true);
  const [RSisVisible, setRSisVisible] = useState(true)

  // Dispatch
  const dispatch = useDispatch();

  // All Chats fetched
  const fetchMessages = () => {
    dispatch(fetchChats());
  };

  useEffect(() => {
    fetchMessages();

    // Set up interval (As a Websocket)
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat">

      {/* --- Loading ---- */}
      {!users && !chats && chatStatus === 'Loading' ? (
        <p>Loading</p>
      ) : (
      
      // ---- Fetching Succeeded ---- 
        <div className="chat-container">

          {/* ---- Left Sidebar ---- */}
          <LiftSidebar
            setSelectedFriend={setSelectedFriend}
            LSisVisible={LSisVisible}
            setLSisVisible={setLSisVisible}
          />

          {/* ---- Chat Box ---- */}
          <ChatBox
            selectedFriend={selectedFriend}
            setLSisVisible={setLSisVisible}
            LSisVisible={LSisVisible}
            setRSisVisible={setRSisVisible}
          />

          {/* ---- Right Sidebar ---- */}
          <RightSidebar selectedFriend={selectedFriend} setRSisVisible={setRSisVisible} RSisVisible={RSisVisible}/>
        </div>
      )}
    </div>
  );
};

export default Chat;
