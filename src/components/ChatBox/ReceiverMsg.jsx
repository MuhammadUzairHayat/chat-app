import React from 'react'

const ReceiverMsg = ({assets}) => {
  return (
    <div className="chat-message-r">
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={assets.profile_img} alt="" />
        <p className="msg">
          I am doing well, thank you! How about you? Lorem ipsum dolor
          sit amet, consectetur adipisicing elit. Ad minima ratione
          ducimus reprehenderit expedita libero. Doloribus quibusdam sit
          laudantium necessitatibus?
        </p>
      </div>
      <span className="chat-time">12:31 PM</span>
    </div>
  </div>
  )
}

export default ReceiverMsg
