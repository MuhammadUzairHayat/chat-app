import React from 'react'

const SelectedFriendBio = ({selectedFriend, assets}) => {
  return (
    <div className="chat-user">
    <div className="chat-user-intro">
      <img src={selectedFriend?.avatar || assets.avatar_icon} alt="" />
      <span className="user">
        <span className="chat-name-dot">
          <span className="chat-user-name">
            {selectedFriend?.username
              .split(" ")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() +
                  word.slice(1).toLowerCase()
              )
              .join(" ") || "User Name"}{" "}
          </span>
          <div className="active-dot"></div>
        </span>
        <p className="chat-user-status">online </p>
      </span>
    </div>
    <img
      style={{ width: "20px", height: "20px" }}
      className="chat-info-icon"
      src={assets.info_icon}
      alt=""
    />
  </div>
  )
}

export default SelectedFriendBio;
