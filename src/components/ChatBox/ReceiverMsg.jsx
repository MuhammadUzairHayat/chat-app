import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { deleteMessages } from "../../config/firbaseUtility";
import { fetchChats } from "../../Features/chatSlice";
import { useDispatch } from "react-redux";

const ReceiverMsg = ({
  assets,
  selectedFriend,
  msg,
  deleteMsg,
  setDeleteMsg,
  chatAbout,
}) => {
  const [timestamp, setTimestamp] = useState(msg.timestamp);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useDispatch();

  const deleteMsgHandler = () => {
    console.log(chatAbout.id, " ", msg.id);
    const lastMessage = chatAbout.lastMessageId === msg.id ? true : false;
    const deletedMessage =
      msg.content === "🗑️ This message has been deleted" ? true : false;
    deleteMessages(chatAbout.id, msg?.id, lastMessage, deletedMessage);
    setDeleteMsg(!deleteMsg);
    dispatch(fetchChats());
  };
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
          <img
            className="msg-avatar"
            src={selectedFriend.avatar || assets.profile_img}
            alt=""
          />
          <div className="menu-msg-div  r-msg-menu">
            <p
              className={`msg   ${
                msg.content === "🗑️ This message has been deleted"
                  ? `msg-del-clr`
                  : `msg-clr`
              }`}
            >
              {msg.content}
            </p>
            <img
              className="r-message-menu"
              src={assets.menu_dots_icon}
              alt=""
              onClick={() => setIsShowMenu(!isShowMenu)}
            />
            <div className={`menu-list ${!isShowMenu ? "dis-none" : ""}`}>
              <ul onMouseLeave={() => setIsShowMenu(false)}>
                <li onClick={deleteMsgHandler}>Delete</li>
              </ul>
            </div>
          </div>
        </div>
        <span className="chat-time">
          {formatDistanceToNow(new Date(timestamp))} ago
        </span>
      </div>
    </div>
  );
};

export default ReceiverMsg;
