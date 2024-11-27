/* eslint-disable no-unused-vars */
import React from 'react';
import './ChatBox.css';
import assets from '../../assets/assets';


const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <div className="chat-user-intro">
          <img src={assets.profile_img} alt="" />
          <span className='user'>
            <span className='chat-name-dot'> 
              <span className="chat-user-name">User Name </span>
              <div className="active-dot"></div>
            </span>
            <p className="chat-user-status">online </p>
          </span>
        </div>
        <img style={{width: '20px', height: '20px'}} className='chat-info-icon' src={assets.info_icon} alt="" />
      </div>

      <div className="chat-message">
        <div className="chat-message-div">
          <div className="chat-message-content">
            <p>Hello, how are you today? </p>
            <span className="chat-message-time">12:30 PM</span>
          </div>
        </div>
        <div className="chat-message-div">
          <div className="chat-message-content">
            <p>I am doing well, thank you! How about you? </p>
            <span className="chat-message-time">12:35 PM</span>
          </div>
        </div>
      </div>

      <div className="chat-send-input">
        <input type="text" placeholder='Type a message...' />
        <img className='chat-gallery-icon' src={assets.gallery_icon} alt="" />
        <img className='chat-send-icon' src={assets.send_button} alt="" />

      </div>
    </div>
  )
}

export default ChatBox
