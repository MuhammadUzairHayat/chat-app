/* eslint-disable no-unused-vars */
import React from 'react';
import assets from '../../assets/assets';

const LS_Main = ({filterUser, usersData, setSelectedFriend}) => {


  return (
    <div className="ls-main">
    {(filterUser || usersData)
      .map((eachUser, index) => (
        <div key={index} className="ls-each-profile" onClick={()=> setSelectedFriend(eachUser)}>
            {/* {console.log(eachUser)} */}
          <img
            className="ls-profile-img"
            src={eachUser.avatar || assets.avatar_icon}
            alt=""
          />
          <div className="ls-profile-info">
            <h1> {eachUser.username}</h1>
            <p>{eachUser.lastMessage || `I'm using Chat-App` }</p>
          </div>
        </div>
      ))}
  </div>
  )
}

export default LS_Main
