import React from "react";
import ReceiverMsg from "./ReceiverMsg";
import ReceiverImage from "./ReceiverImage";
import ReceiverVideo from "./ReceiverVideo";

const ReceiverChatting = ({ receiver, msg, chatAbout }) => {
  return (
    <div>
      {msg.type === "text" ? (
        // --- Receiver Text Message ----
        <ReceiverMsg
          selectedFriend={receiver}
          msg={msg}
          chatAbout={chatAbout}
        />
      ) : msg.type === "video" ? (
        <ReceiverVideo
          selectedFriend={receiver}
          msg={msg}
          chatAbout={chatAbout}
        />
      ) : (
        // ---- Receiver Image Message ----
        <ReceiverImage
          selectedFriend={receiver}
          msg={msg}
          chatAbout={chatAbout}
        />
      )}
    </div>
  );
};

export default ReceiverChatting;
