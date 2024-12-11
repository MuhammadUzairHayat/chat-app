/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Chat.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LiftSidebar from '../../components/LiftSidebar/LiftSidebar'

const Chat = () => {
 
  const [selectedFriend, setSelectedFriend] = useState(null)

  return (
    <div className='chat'>
      <div className="chat-container">
        <LiftSidebar setSelectedFriend={setSelectedFriend} />
        <ChatBox selectedFriend={selectedFriend}/>
        <RightSidebar />
      </div>
    </div>
  )
}

export default Chat
