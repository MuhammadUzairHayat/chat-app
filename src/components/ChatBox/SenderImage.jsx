import React from 'react'

const SenderImage = ({assets}) => {
  return (
    <div className="chat-message-s">
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={assets.profile_img} alt="" />
        <img className="send-img" src={assets.pic1} alt="" />
      </div>{" "}
      <span className="chat-time">12:31 PM</span>
    </div>
  </div>
  )
}

export default SenderImage
