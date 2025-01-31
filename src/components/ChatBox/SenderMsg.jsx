/* eslint-disable no-unused-vars */
import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { deleteMessages } from "../../config/firbaseUtility";
import { useDispatch } from "react-redux";
import { fetchChats } from "../../Features/chatSlice";
import assets from "../../assets/assets";

const SenderMsg = ({ signInUser, msg, chatAbout }) => {
  // ---- Stored Data ----
  const [timestamp, setTimestamp] = useState(msg.timestamp);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const intervalRef = useRef(null);
  const dispatch = useDispatch();

  // ---- Deletion Message ----
  const deleteMsgHandler = () => {
    console.log(chatAbout.id, " ", msg.id);
    const lastMessage = chatAbout.lastMessageId === msg.id ? true : false;
    const deletedMessage =
      msg.content === "🗑️ This message has been deleted" ? true : false;
    deleteMessages(chatAbout.id, msg?.id, lastMessage, deletedMessage);
    // ---- fetching After Deletion -----
    dispatch(fetchChats());
  };

  // ---- Changing Time Ago ----
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimestamp(new Date(msg.timestamp));
      console.log(`Accepted`);
    }, 6000);
    intervalRef.current = timerId;

    return () => clearInterval(intervalRef.current);
  }, [msg.timestamp]);
  return (
    <div
      className="chat-message-s"
      onClick={() => (isShowMenu ? setIsShowMenu(false) : "")}
    >
      <div className="chat-message-content">
        <div className="chat-avatar-time">
          {/* ---- Message Avatar ---- */}
          <img
            className="msg-avatar"
            src={signInUser.avatar || assets.profile_img}
            alt=""
          />

          <div className="s-MsgMenu-sect">
            {/* ---- Message Text ---- */}
            <p
              className={`msg ${
                msg.content === "🗑️ This message has been deleted"
                  ? `msg-del-clr`
                  : `msg-clr`
              }`}
            >
              {msg.content}
            </p>

            {/* ---- Message Menu Icon ---- */}
            <div className="s-message-menu">
              <img
                src={assets.menu_icon_white}
                alt=""
                onClick={() => setIsShowMenu(!isShowMenu)}
              />
              {/* ---- Message Menu Dropdown ---- */}
              <div className={`menu-list ${!isShowMenu ? "dis-none" : ""}`}>
                <ul onMouseLeave={() => setIsShowMenu(false)}>
                  <li className="cursor-pointer" onClick={deleteMsgHandler}>
                    Delete
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Message Time Ago ---- */}
        <span className="chat-time">
          {formatDistanceToNow(new Date(timestamp))} ago
        </span>
      </div>
    </div>
  );
};

export default SenderMsg;
