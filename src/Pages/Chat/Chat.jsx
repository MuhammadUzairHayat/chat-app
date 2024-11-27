/* eslint-disable no-unused-vars */
import React from 'react';
import './Chat.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LiftSidebar from '../../components/LiftSidebar/LiftSidebar'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LiftSidebar />
        <ChatBox />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Chat
