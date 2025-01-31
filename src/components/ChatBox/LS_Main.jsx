/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { getMessages } from "../../config/firbaseUtility";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import EachUser from "./EachUser";

const LS_Main = ({
  userAndChats,
  usersData,
  setSelectedFriend,
  selectedFriend,
}) => {

  // ---- Stored Data ----
  const { authUser } = useContext(AuthContext);

  // ---- Become Zero UnreadMsg Count ----
  const unreadMsgZero = async (chatId) => {
    await updateDoc(doc(db, "chats", chatId), {
      [`unreadCount.${authUser?.uid}`]: 0,
    });
  };

  return (
    <div className="ls-main">
      {!userAndChats
        ? ""
        : userAndChats.map((eachUser, index) => (
             <EachUser eachUser={eachUser} key={index} setSelectedFriend={setSelectedFriend} unreadMsgZero={unreadMsgZero}/>
          ))}
    </div>
  );
};

export default LS_Main;
