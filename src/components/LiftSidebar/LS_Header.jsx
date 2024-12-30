import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { logout } from "../../config/firebase";

const LS_Header = ({ assets, setFilterUser, usersData }) => {
  return (
    <div className="ls-header">
      <div className="ls-nav">
        <img className="ls-logo" src={assets.logo} alt="" />
        <img className="ls-menu-icon" src={assets.menu_icon} alt="" />
        <div className="ls-dropdown-menu shadow-lg">
          <ul>
            <li>
              <span className="flex gap-2">
                <img className="ls-dropdown-icon" src={assets.edit_profile_icon} alt="" />
                <p><Link to={"/profile"}>
                  Edit Profile
                </Link>
                </p>
              </span>
            </li>
            <li>
              <span onClick={() => logout()} className="flex gap-2">
                <img className="ls-dropdown-icon" src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="ls-search">
        <img className="ls-search-icon" src={assets.search_icon} alt="" />
        <SearchBar setFilterUser={setFilterUser} usersData={usersData} />
      </div>
    </div>
  );
};

export default LS_Header;
