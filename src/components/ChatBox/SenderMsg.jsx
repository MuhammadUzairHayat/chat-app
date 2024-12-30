/* eslint-disable no-unused-vars */
import { formatDistanceToNow } from 'date-fns'
import { doc } from 'firebase/firestore'
import React, { useEffect, useRef, useState } from 'react'
import { deleteMessages } from '../../config/firbaseUtility'
import { ms } from 'date-fns/locale'

const SenderMsg = ({assets, signInUser, msg, deleteMsg, setDeleteMsg, chatAbout}) => {
     
     const [timestamp , setTimestamp] = useState(msg.timestamp) 
     const [isShowMenu, setIsShowMenu] = useState(false) 
     const intervalRef = useRef(null);

     const deleteMsgHandler = ()=> {
      console.log(chatAbout.id, " ", msg.id)
       deleteMessages(chatAbout.id, msg.id);
        setDeleteMsg(!deleteMsg);
       }

     useEffect(() => {
       const timerId = setInterval(() => {
         setTimestamp(new Date(msg.timestamp));
         console.log(`Accepted`)
       }, 6000);
       intervalRef.current = timerId;
   
       return () => clearInterval(intervalRef.current);
     }, [msg.timestamp]);
  return (
    <div className="chat-message-s" onClick={()=> isShowMenu ? setIsShowMenu(false) : ''}>
    <div className="chat-message-content">
      <div className="chat-avatar-time">
        <img className="msg-avatar" src={signInUser.avatar || assets.profile_img} alt="" />
        <div className="msg menu_msg_div  s-msg-menu">
          {msg.content}
          <img className="message-menu" src={assets.menu_dots_icon} alt="" onClick={()=> setIsShowMenu(!isShowMenu)} />
          <div className={`menu-list ${!isShowMenu ? 'dis-none' : ''}`}>
          <ul onMouseLeave={()=> setIsShowMenu(false)}>
            <li className='cursor-pointer' onClick={deleteMsgHandler}>Delete</li>
          </ul>
          </div>
        </div>
      </div>
      <span className="chat-time">{formatDistanceToNow(new Date(timestamp))} ago</span>
    </div>
  </div>
  )
}

export default SenderMsg
