import React from 'react'

const ReceiverImage = ({assets}) => {
  return (
    <div className="chat-message-r">
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={assets.profile_img} alt="" />
        <img className="receive-img" src={assets.pic2} alt="" />
      </div>
      <span className="chat-time">12:31 PM</span>
    </div>
  </div>
  )
}

export default ReceiverImage
