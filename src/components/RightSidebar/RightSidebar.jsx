/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets";
import { logout } from "../../config/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useSelector } from "react-redux";

const RightSidebar = () => {
  const { authUser, setAuthUser } = useContext(AuthContext);
  const { status, users, error } = useSelector((state) => state.users);

  const [currentUser, setCurrentUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  // Update state when `users` changes
  useEffect(() => {
    if (status === "succeeded" && users.length > 0) {
      const user = users.find((user) => user.id === authUser.uid);
      setCurrentUser(user);
      setImagePreview(user.avatar || assets.avatar_icon);
      setName(user.username || "User Name");
      setBio(user.bio || "Assalam-o-Alaikum! I hope you be in Good tune 😊.");
    }
  }, [status, users]);

  if (status !== "succeeded") {
    return <div className="flex items-center justify-center">Loading ...</div>;
  }
  return (
    <div className="rs">
      <div className="rs-user-bio">
        <img className="rs-bio-img" src={imagePreview || assets.avatar_icon} alt="" />
        <h3 className="rs-bio-name">
          {name
            .split(" ") 
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ) 
            .join(" ") || "User Name"}{" "}
          <span className="chat-user-status">online</span>
        </h3>

        <p className="rs-bio-desc">
          {bio || `Hey, I'm using chat-app 😊`}
        </p>
      </div>

      <div className="rs-media">
        <h4>Media</h4>
        <div className="rs-media-items">
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />

          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
          <img src={assets.pic3} alt="" />
          <img src={assets.pic4} alt="" />
          <img src={assets.pic1} alt="" />
          <img src={assets.pic2} alt="" />
        </div>

        <div className="rs-logout-div">
          <button
            className="rs-logout-btn rounded-full shadow-lg"
            onClick={() => logout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
