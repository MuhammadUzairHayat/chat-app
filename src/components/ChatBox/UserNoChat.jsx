import React from "react";
import assets from "../../assets/assets";

const UserNoChat = ({chatMessages}) => {
  return chatMessages === null ? (
    <div className="flex items-center justify-center h-full text-sm flex-col text-gray-700">
      <img className="max-w-32 max-h-32" src={assets.logo_icon} alt="" />
      chat with this Friend
    </div>
  ) : (
    <div>
      <div>chats Uploading...</div>
    </div>
  );
};

export default UserNoChat;
