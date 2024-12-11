/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import ProfileUpdate from "./Pages/ProfileUpdate/ProfileUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import NotFound from "./Pages/NotFound/NotFound";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { fetchUsers } from "./Features/userSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import Store from "./APP/Store";
import { BookLoaderComponent } from "./Pages/ProfileUpdate/Loader.jsx";
import { AuthContext } from "./context/AuthContext.jsx";
// import { fetchUsers } from "./Features/userSlice";

const App = () => {
   
  const {authUser, setAuthUser} = useContext(AuthContext)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const dispatch = useDispatch();


  // const {data} = useGetData('users')
  // console.log('App data: ', data)
  // fetchUsers()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setAuthUser(user)
      setIsLoading(!isLoading);
      // dispatch(fetchUsers())
    });
  }, []);

  return (
    <div className="">
      {isLoading ? (
        <div className="app-loading">
          <BookLoaderComponent />
        </div>
      ) : (
        <>
          <ToastContainer autoClose={3000} />
          <Routes>
            <Route path="/login" element={<PublicRoutes user={user} />}>
              <Route index element={<Login />} />
            </Route>
            {/* Other public routes here */}

            <Route path="/" element={<PrivateRoutes user={user} />}>
              <Route index  element={<Chat user={user} />} />
              <Route path="profile" element={<ProfileUpdate loginUser={user} />} />
              {/* Other private routes here */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
