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
        <div className="chat-message-s">
          <div className="chat-message-content">
            <div className="chat-avatar-time">
              <img src={assets.profile_img} alt="" />
              <span className="chat-time">12:31 PM</span>
            </div>
            <p>I am doing well, thank you! How about you? </p>
          </div>
        </div>
        <div className="chat-message-r">
          <div className="chat-message-content">
            <div className="chat-avatar-time">
              <img src={assets.profile_img} alt="" />
              <span className="chat-time">12:31 PM</span>
            </div>
            <p>I am doing well, thank you! How about you?  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad minima ratione ducimus reprehenderit expedita libero. Doloribus quibusdam sit laudantium necessitatibus?</p>
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
