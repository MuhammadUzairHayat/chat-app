/* eslint-disable no-unused-vars */
import React from 'react'

const SenderMsg = ({assets}) => {
  return (
    <div className="chat-message-s">
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={assets.profile_img} alt="" />
        <p className="msg">
          I am doing well, thank you! How about you?{" "}
        </p>
      </div>
      <span className="chat-time">12:31 PM</span>
    </div>
  </div>
  )
}

export default SenderMsg
