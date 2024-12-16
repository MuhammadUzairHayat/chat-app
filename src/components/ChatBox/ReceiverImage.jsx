import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useState } from 'react'

const ReceiverImage = ({assets, selectedFriend, msg}) => {
  
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
        <img className="receive-img" src={msg.img || assets.pic2} alt="" />
      </div>
      <span className="chat-time">{formatDistanceToNow(new Date(timestamp))}</span>
    </div>
  </div>
  )
}

export default ReceiverImage
