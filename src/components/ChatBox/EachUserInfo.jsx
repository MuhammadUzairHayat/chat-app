import React from "react";
import assets from "../../assets/assets";

const EachUserInfo = ({ eachUser }) => {
  return (
    <div className="ls-profile-info">
      {/* ---- Username ---- */}
      <h1> {eachUser?.user?.username}</h1>
      <p>
        {/* ---- No Chatting Yet ---- */}
        {!eachUser?.chats?.lastMessage &&
        !eachUser?.chats?.lastImg &&
        !(eachUser?.chats?.messages
          ? Array.from(eachUser.chats.messages).length
          : 0) ? (
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
            <img className="w-3" src={eachUser?.chats?.lastVideo ? assets.video_icon2 : assets.gallery_blue_icon} alt="" /> {eachUser?.chats?.lastVideo ? "Video" : "Photo"}
          </span>
        )}
      </p>
    </div>
  );
};

export default EachUserInfo;
