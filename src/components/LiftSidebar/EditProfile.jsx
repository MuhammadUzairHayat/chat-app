import { EditNoteSharp } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const EditProfile = ({assets}) => {
  return (
    <li>
      <span className="flex gap-2 items-center">

        <EditNoteSharp />
        <p>
          <Link to={"/profile"}>Edit Profile</Link>
        </p>
      </span>
    </li>
  );
};

export default EditProfile;
