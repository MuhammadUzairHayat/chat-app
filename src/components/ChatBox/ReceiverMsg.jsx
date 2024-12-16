import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react'

const ReceiverMsg = ({assets, selectedFriend, msg}) => {

   const [timestamp , setTimestamp] = useState(msg.timestamp)
   useEffect(()=> {
    const timerId = setInterval(() => {
      setTimestamp(msg.timestamp)
    }, 60000);
 
    return ()=> clearInterval(timerId)
   })
  return (
    <div className="chat-message-r">
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={selectedFriend.avatar || assets.profile_img} alt="" />
        <p className="msg">
          {msg.content}
        </p>
      </div>
      <span className="chat-time">{formatDistanceToNow(new Date(timestamp))}</span>
    </div>
  </div>
  )
}

export default ReceiverMsg
