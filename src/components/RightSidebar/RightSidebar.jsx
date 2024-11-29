/* eslint-disable no-unused-vars */
import React from 'react';
import './RightSidebar.css'
import assets from '../../assets/assets';

const RightSidebar = () => {
  return (
    <div className='rs'>
      <div className="rs-user-bio">
        <img className='rs-bio-img' src={assets.bilal_img} alt='' />
        <h3 className="rs-bio-name">Bilal Azam <span className='chat-user-status'>online</span></h3>
        
        <p className='rs-bio-desc'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio, porro?</p>
      </div>

      <div className="rs-media">
        <h4>Media</h4>
        <div className="rs-media-items">
          <img src={assets.pic1} alt='' />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt='' />
          <img src={assets.pic4} alt='' />
          <img src={assets.pic1} alt='' />
          <img src={assets.pic2} alt='' />
   
          <img src={assets.pic1} alt='' />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt='' />
          <img src={assets.pic4} alt='' />
          <img src={assets.pic1} alt='' />
          <img src={assets.pic2} alt='' />
 
        </div>
         
        <div className="rs-logout-div">
        <button className="rs-logout-btn rounded-full shadow-lg">Logout</button>

        </div>
      </div>
      
    </div>
  )
}

export default RightSidebar
