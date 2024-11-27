/* eslint-disable no-unused-vars */
import React from 'react'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LiftSidebar from '../../components/LiftSidebar/LiftSidebar'

const Chat = () => {
  return (
    <div>
      <div className="chat-container">
        <RightSidebar />
        <ChatBox />
        <LiftSidebar />
      </div>
    </div>
  )
}

export default Chat
