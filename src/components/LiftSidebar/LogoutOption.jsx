import React from "react";
import { logout } from "../../config/firebase";
import { LogoutRounded } from "@mui/icons-material";

const LogoutOption = ({assets}) => {
  return (
    <li>
      <span onClick={() => logout()} className="flex gap-2 items-center">
        <LogoutRounded />
        <p>Logout</p>
      </span>
    </li>
  );
};

export default LogoutOption;
