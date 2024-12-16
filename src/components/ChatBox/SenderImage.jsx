import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useState } from 'react'

const SenderImage = ({assets, msg, signInUser}) => {
  
     const [timestamp , setTimestamp] = useState(msg.timestamp)
     useEffect(()=> {
      const timerId = setInterval(() => {
        // console.log(`Minute Passed Checked`)
        setTimestamp(msg.timestamp)
      }, 60000);
   
      return ()=> clearInterval(timerId)
     }, [msg.timestamp])
  return (
    <div className="chat-message-s">
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={signInUser.avatar || assets.profile_img} alt="" />
        <img className="send-img" src={msg.img || assets.profile_img} alt="" />
      </div>{" "}
      <span className="chat-time">{formatDistanceToNow(new Date(timestamp))}</span>
    </div>
  </div>
  )
}

export default SenderImage
