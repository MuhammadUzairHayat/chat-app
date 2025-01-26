import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { logout } from "../../config/firebase";
import EditProfile from "./EditProfile";
import LogoutOption from "./LogoutOption";

const LS_Header = ({ assets, setFilterUser, usersData }) => {
  return (
    <div className="ls-header">
      <div className="ls-nav">
        {/* ---- LS Header Logo ---- */}
        <img className="ls-logo" src={assets.logo} alt="" />
        <div className="ls-menu-icon">
          <img src={assets.menu_icon} alt="" />
        </div>

        {/* ---- LS Dropdown Menu ---- */}
        <div className="ls-dropdown-menu shadow-lg">
          <ul>
            {/* ---- Edit Profile Option ---- */}
            <EditProfile assets={assets} />

            {/* ---- Logout Option ---- */}
            <LogoutOption assets={assets} />
          </ul>
        </div>
      </div>

      {/* ---- LS Search Bar ---- */}
      <div className="ls-search">
        <img className="ls-search-icon" src={assets.search_icon} alt="" />
        <SearchBar setFilterUser={setFilterUser} usersData={usersData} />
      </div>
    </div>
  );
};

export default LS_Header;
