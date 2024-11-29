/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";

const ProfileUpdate = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("Bilal Azam");
  const [bio, setBio] = useState("Assalam-o-Alaikum! I hope you be in Good tune 😊.");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
    }
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const bioChangeHandler = (event) => {
    setBio(event.target.value);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <form action="">
          <h2 className="profile-head">Update Profile</h2>
          <label htmlFor="profile-avatar">
            <input
              type="file"
              id="profile-avatar"
              accept=".png, .jpg, .jpeg"
              name="profile-avatar"
              onChange={handleFileChange}
              hidden
            />
            <img
              src={imagePreview || assets.avatar_icon}
              alt=""
              className="profile-avatar"
            />
            Choose a profile picture
          </label>
          <input type="text" id="profile-name" placeholder="Enter your name" onChange={nameChangeHandler} />
          <textarea
            name="profile-bio"
            id="profile-bio"
            placeholder="Enter your bio"
            onChange={bioChangeHandler}
          ></textarea>
          <button type="submit" className="profile-button">
            Update
          </button>
        </form>
        <div className="pic-name-bio">
          <img className="profile-img" src={imagePreview || assets.logo_icon} alt="" />
          <h3 >{name}</h3>
          <p >{bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
