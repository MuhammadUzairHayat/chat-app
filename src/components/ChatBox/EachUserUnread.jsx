import React from "react";

const EachUserUnread = ({ authUser, eachUser }) => {
  return (
    <div>
      {eachUser?.chats?.unreadCount ? (
        eachUser?.chats?.unreadCount[authUser.uid] &&
        eachUser?.chats?.unreadCount[authUser.uid] != "0" ? (
          <div className="unread">
            {eachUser?.chats?.unreadCount[authUser.uid]}
          </div>
        ) : (
          " "
        )
      ) : (
        " "
      )}
    </div>
  );
};

export default EachUserUnread;
