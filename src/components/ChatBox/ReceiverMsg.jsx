import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { deleteMessages } from "../../config/firbaseUtility";

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

  const deleteMsgHandler = () => {
    console.log(chatAbout.id, " ", msg.id);
    deleteMessages(chatAbout.id, msg?.id);
    setDeleteMsg(!deleteMsg);
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
            <p className="msg">{msg.content}</p>
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
