/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./LiftSidebar.css";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LS_Header from "./LS_Header";
import LS_Main from "../ChatBox/LS_Main";

const LiftSidebar = ({setSelectedFriend}) => {
  const [filterUser, setFilterUser] = useState([])
  const { status, users, error } = useSelector((state) => state.users);

  if (status !== "succeeded") {
    return <div> Loading ... </div>
  }
  
  return (
    <div>
      <div className="ls">
        {/* ---- LeftSidebar Header ---- */}
        <LS_Header assets={assets} setFilterUser={setFilterUser} usersData={users} />

        {/* ---- LeftSidebar Main ---- */}
        <LS_Main filterUser={filterUser} usersData={users} setSelectedFriend={setSelectedFriend} />
      </div>
    </div>
  );
};

export default LiftSidebar;
