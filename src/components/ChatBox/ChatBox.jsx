/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
import { useSelector } from "react-redux";
// import BookLoaderComponent  from "../../Pages/ProfileUpdate/Loader";
import SenderMsg from "./SenderMsg";
import SenderImage from "./SenderImage";
import ReceiverMsg from "./ReceiverMsg";
import ReceiverImage from "./ReceiverImage";
import { AuthContext } from "../../context/AuthContext";
import SelectedFriendBio from "./SelectedUser";
import SendMessageInput from "./SendMessageInput";
import { getMessages } from "../../config/firbaseUtility";

// eslint-disable-next-line react/prop-types
const ChatBox = ({ selectedFriend }) => {
  const { authUser } = useContext(AuthContext);
  const [chatAbout, setChatAbout] = useState(null);
  const [chatMessages, setChatMessages] = useState(null);
  const [sentMessage, setSentMessage] = useState(true)
  const { status, users, error } = useSelector((state) => state.users);
  const { chatsStatus, chats, chatsError } = useSelector(
    (state) => state.chats
  );

  const [signInUser, setSignInUser] = useState(null);


  useEffect(() => {
    const fetchMessages = async (tempSelection) => {
      if (tempSelection) {
        try {
          console.log(tempSelection.id);
          const messages = await getMessages(tempSelection.id); // Await the promise
          console.log(`Messages: `, messages);
          setChatMessages(messages); // Store the resolved data in state
        } catch (error) {
          console.error("Error fetching messages: ", error);
        }
      }
    };

    try {
      if (status === "succeeded") {
        const result = users.find((user) => user.id === authUser.uid);
        setSignInUser(result);
      }
      if (chatsStatus === "succeeded" && selectedFriend) {
        // console.log(`Check SelectedFriend:  `, selectedFriend.username);

        const tempSelection = chats.find(
          (chat) =>
            chat.id === `${signInUser.id}_${selectedFriend.id}` ||
            chat.id === `${selectedFriend.id}_${signInUser.id}`
        );
        // console.log(`Checking TempSelection: `, tempSelection);
        console.log(tempSelection);
        fetchMessages(tempSelection);
        if (tempSelection) {
          setChatAbout(tempSelection);
        } else {
          setChatMessages(null);
        }
      }
    } catch (error) {
      console.error(console.error);
    }
  }, [chatsStatus, status, authUser, selectedFriend, users, chats, signInUser, sentMessage]);

  if (status === "loading" && chatsStatus !== "succeeded") {
    return <div className="flex items-center justify-center ">loading</div>;
  } else if (!selectedFriend) {
    return (
      <div className="flex items-center justify-center flex-col">
        {" "}
        <img className="max-w-40 opacity-90" src={assets.logo_icon} alt="" />
        <h2 className="text-[#333]"> Welcome to Chat-App </h2>
        <p className="text-gray-400 text-xs">
          App made by Unknown one Select User To Chat with him
        </p>
        <p className="bg-[#0289cc] text-white px-6 py-2 rounded-full mt-6">
          chat-App
        </p>
      </div>
    );
  } else {
    return (
      <div className="chat-box">
        {/* ---- Chat_Top_User_Bio -----*/}
        <SelectedFriendBio assets={assets} selectedFriend={selectedFriend} />
        {/* ---- Chatting-Of-User ----- */}

        <div className="chat-message">
          {console.log(chatMessages)}
          {!chatMessages ? (
            chatMessages === null ? (
              <div className="flex items-center justify-center h-full text-sm flex-col text-gray-700"> <img className="max-w-32 max-h-32" src={assets.logo_icon} alt="" />chat with this Friend</div>
            ) : (
              <div>
                <div>chats Uploading...</div>
              </div>
            )
          ) : (
            chatMessages.sort((a, b)=> a.timestamp - b.timestamp).map((msg, index) => (
              <div key={msg.id || index}>
                {" "}
                {/* Add a unique key for each element */}
                {/* --- Sender Messages or Receiver Messages --- */}
                {msg.senderId === signInUser?.id ? ( // Check if the message is from the sender
                  <>
                    {msg.type === "text" ? (
                      <SenderMsg
                        assets={assets}
                        signInUser={signInUser}
                        msg={msg}
                      />
                    ) : (
                      <SenderImage
                        assets={assets}
                        signInUser={signInUser}
                        msg={msg}
                      />
                    )}
                  </>
                ) : (
                  <>
                    {msg.type === "text" ? (
                      <ReceiverMsg
                        assets={assets}
                        selectedFriend={selectedFriend}
                        msg={msg}
                      />
                    ) : (
                      <ReceiverImage
                        assets={assets}
                        selectedFriend={selectedFriend}
                        msg={msg}
                      />
                    )}
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* ----- Send_Message_Input ------ */}
        <SendMessageInput
          selectedFriend={selectedFriend}
          signInUser={signInUser}
          sentMessage={sentMessage}
          setSentMessage={setSentMessage}
        />
      </div>
    );
  }
};

export default ChatBox;
