import React from "react";

const ChatDefaultView = ({assets, setLSisVisible}) => {
  return (
    <div className="flex items-center justify-center flex-col h-[100vh]">
      {" "}
      <img className="max-w-40 opacity-90" src={assets.logo_icon} alt="" />
      <h2 className="text-[#333]"> Welcome to Chat-App </h2>
      <p className="text-gray-400 text-xs text-center px-2">
        App made by Muhammad Uzair Select User To Chat with him
      </p>
      <button
        onClick={() => setLSisVisible(prev=> !prev)}
        className="bg-[#0289cc] text-white px-6 py-2 rounded-full mt-6 "
        disabled={window.innerWidth >= "780" ? true : false}
      >
        chat-App
      </button>
    </div>
  );
};

export default ChatDefaultView;
