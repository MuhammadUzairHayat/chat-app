import React, { useEffect, useState } from 'react'
import ImgToShow from '../../context/ImageModal/ImgToShow';
import assets from '../../assets/assets';
import { formatDistanceToNow } from 'date-fns';
import { useDispatch } from 'react-redux';
import { deleteMessages } from '../../config/firbaseUtility';
import { fetchChats } from '../../Features/chatSlice';

const SenderVideo = ({signInUser, msg, chatAbout}) => {
  // ---- Stored Data ----
  const [timestamp, setTimestamp] = useState(msg.timestamp);
  const [isShowMenu, setIsShowMenu] = useState(false);
  const dispatch = useDispatch();

  // ---- Deletion Sender Image Message ----
  const deleteMsgHandler = async () => {
    console.log(chatAbout.id, " ", msg.id);
    const lastMessage = chatAbout.lastMessageId === msg.id ? true : false;
    await deleteMessages(chatAbout.id, msg.id, lastMessage, false, true);
    // ---- Fetching Chats After Deletion ----ٖ
    dispatch(fetchChats());
  };

  // ---- Changing Time Ago ----
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimestamp(msg.timestamp);
    }, 60000);

    return () => clearInterval(timerId);
  }, [msg.timestamp]);

  return (
    <div className="chat-message-s text-msg">
      <div className="chat-message-content">
        <div className="chat-avatar-time">
          {/* ---- Message Avatar ---- */}
          <img
            className="msg-avatar"
            src={signInUser?.avatar || assets?.profile_img}
            alt=""
          />
          <div className="s-ImgMenu-sect">
            {/* ---- Message Image ---- */}
            <ImgToShow imageurl={msg?.video || assets.video_uploaded} type={msg?.type} />

            {/* ---- Message Menu Icon ---- */}
            <div className="s-message-menu">
              <img
                src={assets.menu_icon_white}
                alt=""
                onClick={() => setIsShowMenu(!isShowMenu)}
              />

            {/* ---- Message Menu Dropdown ---- */}
            <div className={`menu-list ${!isShowMenu ? "dis-none" : ""}`}>
              <ul className="text-xs" onMouseLeave={() => setIsShowMenu(false)}>
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
}

export default SenderVideo
