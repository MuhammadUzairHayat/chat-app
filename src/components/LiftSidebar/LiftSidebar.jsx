/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./LiftSidebar.css";
import assets from "../../assets/assets";
import { getMessages } from "../../config/firbaseUtility";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LS_Header from "./LS_Header";
import LS_Main from "../ChatBox/LS_Main";

const LiftSidebar = ({
  setSelectedFriend,
  LSisVisible,
  selectedFriend,
  setLSisVisible,
}) => {

  // ---- Data Stored ---
  const [filterUser, setFilterUser] = useState([]);
  const { status, users, error } = useSelector((state) => state.users);
  const { authUser } = useContext(AuthContext);
  const [userAndChats, setUserAndChats] = useState(null);
  const [sentMessage, setSentMessage] = useState(true);
  const [signInUser, setSignInUser] = useState(null);
  const { chatsStatus, chats, chatsError } = useSelector(
    (state) => state.chats
  );

  useEffect(() => {
    try {

      // ---- Storing Signin User Full Data ----
      if (status === "succeeded") {
        const result = users.find((user) => user.id === authUser.uid);
        setSignInUser(result);
      }

      // ---- Storing Each User with own Chats ----
      if (chatsStatus === "succeeded" && chats) {

        // filterUser filtered in LS_Header
        if (filterUser && filterUser.length > 0) { 

        // ---- Storing Each User with own Chats in userAndChats ----
          const tempData = filterUser.map((user) => {
            const chatsData = chats.find((chat) => chat.participants.includes(authUser.uid) && chat.participants.includes(user.id) );
            return { user, chats: chatsData || null};
          });
          setUserAndChats(tempData);
        }
      }
    } catch (error) {
      console.error(console.error);
    }
  }, [
    chatsStatus,
    status,
    authUser,
    selectedFriend,
    users,
    chats,
    signInUser,
    sentMessage,
    filterUser,
  ]);

  return (
    <div className="ls-container">
      <div className={`ls  ${LSisVisible ? `LS_hide` : "LS_unhide "}`}>

        {/* ---- LiftSidebar Closing Toggle ---- */}
        <button
          onClick={() => setLSisVisible(!LSisVisible)}
          className="close_LS_btn"
        >
          {" "}
          <img src={assets.cross_icon} alt="" />
        </button>

        {/* ---- LeftSidebar Header ---- */}
        <LS_Header
          assets={assets}
          setFilterUser={setFilterUser}
          usersData={users}
        />

        {/* ---- LeftSidebar Main ---- */}
        <LS_Main
          userAndChats={userAndChats}
          usersData={users}
          setSelectedFriend={setSelectedFriend}
          selectedFriend={selectedFriend}
        />
      </div>
    </div>
  );
};

export default LiftSidebar;
