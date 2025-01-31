import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import assets from "../../assets/assets";
import EachUserUnread from "./EachUserUnread";
import EachUserInfo from "./EachUserInfo";

const EachUser = ({ eachUser, setSelectedFriend, unreadMsgZero }) => {
  const { authUser } = useContext(AuthContext);
  return (
    <div 
      className="ls-profile-container"
      onClick={() => {
        setSelectedFriend({
          user: eachUser.user,
          chats: eachUser.chats,
        });
        if (eachUser?.chats?.id) {
          unreadMsgZero(eachUser.chats.id);
        }
      }}
    >
      <div className="ls-each-profile">
        {/* ---- User Avatar ----  */}
        <img
          className="ls-profile-img"
          src={eachUser?.user?.avatar || assets.avatar_icon}
          alt=""
        />

        {/* ---- User Info ---- */}
        <EachUserInfo eachUser={eachUser} />
      </div>

      {/* ---- User Unread Messages Count ---- */}
      <EachUserUnread authUser={authUser} eachUser={eachUser} />
    </div>
  );
};

export default EachUser;
