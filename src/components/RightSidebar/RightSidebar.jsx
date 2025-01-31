/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";
import EachMedia from "./EachMedia";
import RS_CloseToggle from "./RS_CloseToggle";
import SelectedUserBio from "./SelectedUserBio";
import RS_Media from "./RS_Media";

const RightSidebar = ({ selectedFriend, setRSisVisible, RSisVisible }) => {
  // ---- Storing Data ----
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { status, users, error } = useSelector((state) => state.users);
  const [receiver, setReceiver] = useState(null);
  const [chatAbout, setChatAbout] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const { chatsStatus, chats, chatsError } = useSelector(
    (state) => state.chats
  );

  useEffect(() => {
    // ---- Setting Receiver Data -----
    if (chatsStatus === "succeeded" && selectedFriend) {
      const gettingChat = chats.find(
        (chat) => chat.id === selectedFriend?.chats?.id
      );
      setReceiver(selectedFriend.user);
      setChatAbout(gettingChat || null);
      setChatMessages(gettingChat?.messages || null);
    }
  }, [selectedFriend, chatsStatus, chats]);

  return (
    <div className={"rs  " + (RSisVisible ? "rs-unhide " : "") + (RSisVisible ? "dis-none ": "")}>
    
    {/* ---- RightSideBar Closing Toggle ---- */}
    <RS_CloseToggle assets={assets} setRSisVisible={setRSisVisible} />

    {/* ---- RightSidebar Bio ---- */}
    <SelectedUserBio assets={assets} receiver={receiver} />
     
    {/* ---- RightSidebar Media ---- */}
    <RS_Media assets={assets} chatAbout={chatAbout} chatMessages={chatMessages} />
    </div>
  );
};

export default RightSidebar;
