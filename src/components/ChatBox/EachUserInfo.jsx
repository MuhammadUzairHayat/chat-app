import React from "react";
import assets from "../../assets/assets";

const EachUserInfo = ({ eachUser }) => {
  return (
    <div className="ls-profile-info">
      {/* ---- Username ---- */}
      <h1> {eachUser?.user?.username}</h1>
      <p>
        {/* ---- No Chatting Yet ---- */}
        {!eachUser?.chats?.lastMessage && !eachUser?.chats?.lastImg ? (
          `No chatting yet`
        ) : // ---- Message has deleted ----
        eachUser?.chats?.lastMessage ? (
          eachUser?.chats?.lastMessage === "del" ? (
            <i>🗑️ This message has been deleted</i>
          ) : (
            // ---- Last Text Message ----
            eachUser?.chats?.lastMessage
          )
        ) : (
          // ---- Last Image Message ----
          <span className="flex gap-1">
            {" "}
            <img className="w-3" src={assets.gallery_blue_icon} alt="" /> Photo
          </span>
        )}
      </p>
    </div>
  );
};

export default EachUserInfo;
