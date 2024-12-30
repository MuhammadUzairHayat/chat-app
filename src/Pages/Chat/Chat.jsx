/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Chat.css'
import ChatBox from '../../components/ChatBox/ChatBox'
import RightSidebar from '../../components/RightSidebar/RightSidebar'
import LiftSidebar from '../../components/LiftSidebar/LiftSidebar'

const Chat = () => {
 
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [LSisVisible, setLSisVisible] = useState(true)
  console.log(`LSisVisible `, LSisVisible);

  return (
    <div className='chat'>
      <div className="chat-container">
        <LiftSidebar setSelectedFriend={setSelectedFriend} LSisVisible={LSisVisible} setLSisVisible={setLSisVisible} />
        <ChatBox selectedFriend={selectedFriend} setLSisVisible={setLSisVisible} LSisVisible={LSisVisible} />
        <RightSidebar />
      </div>
    </div>
  )
}

export default Chat
