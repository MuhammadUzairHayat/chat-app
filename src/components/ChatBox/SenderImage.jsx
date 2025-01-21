import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { deleteMessages } from "../../config/firbaseUtility";
import { fetchChats } from "../../Features/chatSlice";
import { useDispatch } from "react-redux";

const SenderImage = ({assets, signInUser, msg, deleteMsg, setDeleteMsg, chatAbout}) => {
  const [timestamp, setTimestamp] = useState(msg.timestamp);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const dispatch = useDispatch();

  const deleteMsgHandler = () => {
    console.log(chatAbout.id, " ", msg.id);
    deleteMessages(chatAbout.id, msg.id);
    setDeleteMsg(!deleteMsg);
    dispatch(fetchChats());
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      // console.log(`Minute Passed Checked`)
      setTimestamp(msg.timestamp);
    }, 60000);

    return () => clearInterval(timerId);
  }, [msg.timestamp]);
  return (
    <div className="chat-message-s text-msg">
      <div className="chat-message-content">
        <div className="chat-avatar-time">
          <img
            className="msg-avatar"
            src={signInUser.avatar || assets.profile_img}
            alt=""
          />
          <div className="menu_msg_div s-msg-menu s-img-msg_menu">
            <img
              className={`send-img ${isZoom ? "send-img-zoom" : ""}`}
              src={msg.img || assets.pic2}
              alt=""
              onClick={() => setIsZoom(!isZoom)}
            />
            <img
              className="message-menu"
              src={assets.menu_dots_icon}
              alt=""
              onClick={() => setIsShowMenu(!isShowMenu)}
            />
            <div className={`menu-list ${!isShowMenu ? "dis-none" : ""}`}>
              <ul className="text-xs" onMouseLeave={() => setIsShowMenu(false)}>
                <li onClick={deleteMsgHandler}>Delete</li>
              </ul>
            </div>
          </div>
        </div>{" "}
        <span className="chat-time">
          {formatDistanceToNow(new Date(timestamp))} ago
        </span>
      </div>
    </div>
  );
};

export default SenderImage;
