import { formatDistanceToNow } from "date-fns";
import React, { useEffect, useState } from "react";
import { deleteMessages } from "../../config/firbaseUtility";
import { fetchChats } from "../../Features/chatSlice";
import { useDispatch } from "react-redux";
import assets from "../../assets/assets";
import ImgToShow from "../../context/ImageModal/ImgToShow";

const ReceiverImage = ({ selectedFriend, msg, chatAbout }) => {
  // ---- Stored Data ----
  const [timestamp, setTimestamp] = useState(msg.timestamp);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isZoom, setIsZoom] = useState(false);
  const dispatch = useDispatch();

  // ---- Deletion Image ----
  const deleteMsgHandler = async () => {
    console.log(chatAbout.id, " ", msg.id);
    const lastMessage = chatAbout.lastMessageId === msg.id ? true : false;
    await deleteMessages(chatAbout.id, msg.id, lastMessage, false, true);
    dispatch(fetchChats());
  };

  // ---- Changing Time Ago ----
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
          <div className="r-ImgMenu-sect">
            {/* ---- Message Image ---- */}
            <ImgToShow
              // className={`receive-img ${isZoom ? "receive-img-zoom" : ""}`}
              imageUrl={msg.img || assets.pic2}
              // alt=""
              // onClick={() => setIsZoom(!isZoom)}
            />

            {/* --- Message Menu Icon ---- */}
            <div className="r-message-menu">
            <img
             onClick={() => setIsShowMenu(!isShowMenu)}
              src={assets.menu_icon_white}
              alt=""
              imageUrl={assets}
            />

            {/* ---- Message Menu Dropdown ---- */}
            <div
              className={`menu-list left-[100%] ${
                !isShowMenu ? "dis-none" : ""
              }`}
            >
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

export default ReceiverImage;
