/* eslint-disable no-unused-vars */
import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useRef, useState } from 'react'

const SenderMsg = ({assets, signInUser, msg}) => {
  
     const [timestamp , setTimestamp] = useState(msg.timestamp)  
     const intervalRef = useRef(null);

     useEffect(() => {
       const timerId = setInterval(() => {
         setTimestamp(new Date(msg.timestamp));
         console.log(`Accepted`)
       }, 6000);
       intervalRef.current = timerId;
   
       return () => clearInterval(intervalRef.current);
     }, [msg.timestamp]);
  return (
    <div className="chat-message-s">
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={signInUser.avatar || assets.profile_img} alt="" />
        <p className="msg">
          {msg.content}
        </p>
      </div>
      <span className="chat-time">{formatDistanceToNow(new Date(timestamp))}</span>
    </div>
  </div>
  )
}

export default SenderMsg
