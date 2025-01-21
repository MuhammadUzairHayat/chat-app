/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import assets from "../../assets/assets";
import { getMessages } from "../../config/firbaseUtility";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";

const LS_Main = ({
  userAndChats,
  usersData,
  setSelectedFriend,
  selectedFriend,
}) => {
  //  console.log(`userAndChats: `, userAndChats);
  return (
    <div className="ls-main">
      {!userAndChats
        ? ""
        : userAndChats.map((eachUser, index) => (
            <div
              key={index}
              className="ls-each-profile"
              onClick={() =>
                setSelectedFriend({
                  user: eachUser.user,
                  chats: eachUser.chats,
                })
              }
            >
              {/* {console.log(eachUser)} */}
              <img
                className="ls-profile-img"
                src={eachUser?.user?.avatar || assets.avatar_icon}
                alt=""
              />
              <div className="ls-profile-info">
                <h1> {eachUser?.user?.username}</h1>
                <p>
                  {eachUser?.chats?.lastMessage === null &&
                  eachUser?.chats?.lastImg === null ? (
                    `No chatting yet`
                  ) : eachUser?.chats?.lastMessage ? (
                   eachUser?.chats?.lastMessage === 'del' ? 
                    <i>🗑️ This message has been deleted</i>:
                    eachUser?.chats?.lastMessage
                  ) : (
                    <span className="flex gap-1">
                      {" "}
                      <img
                        className="w-3"
                        src={assets.gallery_blue_icon}
                        alt=""
                      />{" "}
                      Photo
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default LS_Main;
