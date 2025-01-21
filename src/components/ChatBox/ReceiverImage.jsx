import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { deleteMessages } from "../../config/firbaseUtility";
import { fetchChats } from "../../Features/chatSlice";
import { useDispatch } from "react-redux";

const ReceiverImage = ({   assets,
  selectedFriend,
  msg,
  deleteMsg,
  setDeleteMsg,
  chatAbout,}) => {
  const [timestamp, setTimestamp] = useState(msg.timestamp);
  const [isShowMenu, setIsShowMenu] = useState(false);

  const [isZoom, setIsZoom] = useState(false);
  const dispatch = useDispatch();

  const deleteMsgHandler = async () => {
    console.log(chatAbout.id, " ", msg.id);
    await deleteMessages(chatAbout.id, msg?.id);
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
          <div className="menu-msg-div r-img-div">
            <img
              className={`receive-img ${isZoom ? "receive-img-zoom" : ""}`}
              src={msg.img || assets.pic2}
              alt=""
              onClick={() => setIsZoom(!isZoom)}
            />
            <img
              className="r-message-menu"
              src={assets.menu_dots_icon}
              alt=""
              onClick={()=> setIsShowMenu(!isShowMenu)}
            />
            <div className={`menu-list left-[100%] ${!isShowMenu ? "dis-none" : ""}`}>
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

export default ReceiverImage;
