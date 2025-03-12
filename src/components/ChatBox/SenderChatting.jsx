import React from "react";
import SenderMsg from "./SenderMsg";
import SenderImage from "./SenderImage";
import SenderVideo from "./SenderVideo";

const SenderChatting = ({ msg, signInUser, chatAbout }) => {
  return (
    <div>
      {msg.type === "text" ? (
        // ---- Sender Text Message ----
        <SenderMsg signInUser={signInUser} msg={msg} chatAbout={chatAbout} />
      ) : // ---- Sender Image Message ----
      msg.type === "image" ? (
        <SenderImage signInUser={signInUser} msg={msg} chatAbout={chatAbout} />
      ) : (
        <SenderVideo signInUser={signInUser} msg={msg} chatAbout={chatAbout} />
      )}
    </div>
  );
};

export default SenderChatting;
