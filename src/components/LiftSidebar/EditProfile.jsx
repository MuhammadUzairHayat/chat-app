import React from "react";
import { Link } from "react-router-dom";

const EditProfile = ({assets}) => {
  return (
    <li>
      <span className="flex gap-2">
        <img
          className="ls-dropdown-icon"
          src={assets.edit_profile_icon}
          alt=""
        />
        <p>
          <Link to={"/profile"}>Edit Profile</Link>
        </p>
      </span>
    </li>
  );
};

export default EditProfile;
