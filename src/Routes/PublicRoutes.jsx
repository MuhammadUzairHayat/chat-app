/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const PublicRoutes = ({user}) => {
  // console.log('Hi User ', user)
console.log(user)

    return user ? (
      <Navigate to="/" />
    ) : (
      <Outlet />
    );
};

export default PublicRoutes;