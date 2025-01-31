import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { deleteMessages } from "../../config/firbaseUtility";
import { fetchChats } from "../../Features/chatSlice";
import { useDispatch } from "react-redux";
import assets from "../../assets/assets";

const ReceiverMsg = ({ selectedFriend, msg, chatAbout }) => {
  // ---- Stored Data ----
  const [timestamp, setTimestamp] = useState(msg.timestamp);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useDispatch();

  // ---- Deleting Message ----
  const deleteMsgHandler = () => {
    console.log(chatAbout.id, " ", msg.id);
    const lastMessage = chatAbout.lastMessageId === msg.id ? true : false;
    const deletedMessage =
      msg.content === "🗑️ This message has been deleted" ? true : false;
    deleteMessages(chatAbout.id, msg?.id, lastMessage, deletedMessage);

    // fetch Chats After Deletion
    dispatch(fetchChats());
  };

  // ---- Time Ago Changing ----
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimestamp(msg.timestamp);
    }, 60000);

    return () => clearInterval(timerId);
  });
  return (
    <div className="chat-message-r">
      <div className="chat-message-content">
        <div className="chat-avatar-time">
          {/* ---- Message Avatar ---- */}
          <img
            className="msg-avatar"
            src={selectedFriend.avatar || assets.profile_img}
            alt=""
          />

          <div className="r-MsgMenu-sect">
            {/* ---- Message Text ---- */}
            <p
              className={`msg   ${
                msg.content === "🗑️ This message has been deleted"
                  ? `msg-del-clr`
                  : `msg-clr`
              }`}
            >
              {msg.content}
            </p>

            {/* ---- Message Menu Icon ---- */}
            <div className="r-message-menu">
              <img
                src={assets.menu_icon_white}
                alt=""
                onClick={() => setIsShowMenu(!isShowMenu)}
              />

              {/* ---- Message Menu Dropdown */}
              <div className={`menu-list ${!isShowMenu ? "dis-none" : ""}`}>
                <ul onMouseLeave={() => setIsShowMenu(false)}>
                  <li onClick={deleteMsgHandler}>Delete</li>
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

export default ReceiverMsg;
