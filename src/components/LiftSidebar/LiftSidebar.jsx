/* eslint-disable no-unused-vars */
import React from "react";
import "./LiftSidebar.css";
import assets from "../../assets/assets";

const LiftSidebar = () => {
  return (
    <div>
      <div className="ls">
        <div className="ls-header">
          <div className="ls-nav">
            <img className="ls-logo" src={assets.logo} alt="" />
            <img className="ls-menu-icon" src={assets.menu_icon} alt="" />
            <div className="ls-dropdown-menu shadow-lg">
              <ul>
                <li>
                  <a href="">
                    <img className="ls-icon" src={assets.home_icon} alt="" />
                    <p>Edit Profile</p>
                  </a>
                </li>
                <li>
                  <a href="">
                    <img className="ls-icon" src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="ls-search">
            <img className="ls-search-icon" src={assets.search_icon} alt="" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="ls-main">
          {Array(15)
            .fill("")
            .map((item, index) => (
              <div key={index} className="ls-each-profile">
                <img
                  className="ls-profile-img"
                  src={assets.profile_img}
                  alt=""
                />
                <div className="ls-profile-info">
                  <h1>John Doe {index}</h1>
                  <p>Software Engineer</p>
                </div>
                {/* Uncomment the following if needed */}
                {/* <div className="ls-profile-status">
        <div className="ls-green-dot"></div>
        <p>Active</p>
      </div> */}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LiftSidebar;
