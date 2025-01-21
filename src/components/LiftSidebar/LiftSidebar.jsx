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
  const [filterUser, setFilterUser] = useState([]);
  const { status, users, error } = useSelector((state) => state.users);
  const { authUser } = useContext(AuthContext);
  const [userAndChats, setUserAndChats] = useState(null);
  const [sentMessage, setSentMessage] = useState(true);
  const { chatsStatus, chats, chatsError } = useSelector(
    (state) => state.chats
  );

  // console.log(`chats LiftSidebar:  `, chats);

  const [signInUser, setSignInUser] = useState(null);

  useEffect(() => {
    try {
      if (status === "succeeded") {
        const result = users.find((user) => user.id === authUser.uid);
        setSignInUser(result);
      }
      if (chatsStatus === "succeeded" && chats) {
        // console.log(`Check SelectedFriend:  `, selectedFriend.username);
        if (filterUser && filterUser.length > 0) {
          // console.log(`Real Chats: `, chats);
          const tempData = filterUser.map((user) => {
            // console.log(`User: `, user);
            const chatsData = chats.find((chat) => chat.participants.includes(authUser.uid) && chat.participants.includes(user.id) );
            return { user, chats: chatsData || null};
          });
          // console.log("TempSelection: ", tempData);
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

  // if (status !== "succeeded") {
  //   return <div> Loading ... </div>;
  // }

  return (
    <div className="ls-container">
      <div className={`ls  ${LSisVisible ? `LS_hide` : "LS_unhide "}`}>
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

        {/* console.log(`the userAndChats: `, userAndChats) */}
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
