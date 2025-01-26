import React from "react";
import { logout } from "../../config/firebase";

const LogoutOption = ({assets}) => {
  return (
    <li>
      <span onClick={() => logout()} className="flex gap-2">
        <img className="ls-dropdown-icon" src={assets.logout_icon} alt="" />
        <p>Logout</p>
      </span>
    </li>
  );
};

export default LogoutOption;
