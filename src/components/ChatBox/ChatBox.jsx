/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
import { useSelector } from "react-redux";
import { BookLoaderComponent } from "../../Pages/ProfileUpdate/Loader";
import SenderMsg from "./SenderMsg";
import SenderImage from "./SenderImage";
import ReceiverMsg from "./ReceiverMsg";
import ReceiverImage from "./ReceiverImage";
import { AuthContext } from "../../context/AuthContext";
import SelectedFriendBio from "./SelectedUser";
import SendMessageInput from "./SendMessageInput";

// eslint-disable-next-line react/prop-types
const ChatBox = ({ selectedFriend }) => {
  const { authUser } = useContext(AuthContext);
  const { status, users, error } = useSelector((state) => state.users);
  // console.log(status, users, error);
  // const getUser = createSelector(
  //   [(state)=> state.users.users],
  //   (users, userId) => users.find(post => String(post.userId) === String(userId))
  // )

  const [signInUser, setSignInUser] = useState(null);

  useEffect(() => {
    if (status === "succeeded") {
      const result = users.find((user) => user.id === authUser.uid);
      setSignInUser(result);
    }
  }, [users, status]);

  if (status === "loading") {
    return <div className="flex items-center justify-center ">loading</div>;
  } else if (!selectedFriend) {
    return (
      <div className="flex items-center justify-center flex-col">
        {" "}
        <img className="max-w-40 opacity-90" src={assets.logo_icon} alt="" />
        <h2 className="text-[#333]"> Welcome to Chat-App </h2>
        <p className="text-gray-400 text-xs">App made by Unknown one Select User To Chat with him</p>
         <p className="bg-[#0289cc] text-white px-6 py-2 rounded-full mt-6">chat-App</p>
      </div>
    );
  } else {
    return (
      <div className="chat-box">
        {/* ---- Chat_Top_User_Bio -----*/}
        <SelectedFriendBio assets={assets} selectedFriend={selectedFriend} />

        {/* ---- Chatting-Of-User ----- */}

        <div className="chat-message">
          {/* --- Sender_Messages ---- */}
          <SenderMsg assets={assets} />

          {/* --- Sender_Images ---- */}
          <SenderImage assets={assets} />

          {/* --- Receiver_Messages ---- */}
          <ReceiverMsg assets={assets} />

          {/* --- Receiver_Images ---- */}
          <ReceiverImage assets={assets} />
        </div>

        {/* ----- Send_Message_Input ------ */}
        <SendMessageInput />
      </div>
    );
  }
};

export default ChatBox;
