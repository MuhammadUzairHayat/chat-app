/* eslint-disable no-unused-vars */
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../config/firebase";
// import { useEffect, useState } from "react";
import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({user}) => {
  // console.log('Hi User ', user)

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;