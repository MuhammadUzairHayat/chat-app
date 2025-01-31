/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  getUploadFileURL,
  updateUserProfile,
} from "../../config/firbaseUtility";
import { toast } from "react-toastify";
// import  BookLoaderComponent  from "./Loader";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { use } from "react";
import { fetchUsers } from "../../Features/userSlice";
import { updateProfile } from "firebase/auth";

const ProfileUpdate = () => {
  // ---- Stored Data ----
  const { authUser } = useContext(AuthContext);
  const { status, users, error } = useSelector((state) => state.users);
  const [currentUser, setCurrentUser] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [isUrlCreated, setIsUrlCreated] = useState(true);

  const dispatch = useDispatch()
  const navigate = useNavigate();

  // ---- Updating state when User Changes ----
  useEffect(() => {
    if (status === "succeeded" && users.length > 0) {
      // ---- Finding AuthUser Data ----
      const user = users.find((user) => user.id === authUser.uid);
      // console.log(`These are users: `,users)
      setCurrentUser(user);
      setImagePreview(user?.avatar || assets.avatar_icon);
      setName(user?.username || "User Name");
      setBio(user?.bio || "Assalam-o-Alaikum! I hope you be in Good tune 😊.");
    }
  }, [status, users, authUser]);

  // ---- Updating Profile Handler ----
  const UpdateProfileHandler = async (event) => {
    event.preventDefault();
    setUpdateLoading(true); // Start Loading State

    try {
      if (currentUser) {
        console.log(`yes`);
        await updateUserProfile({
          id: authUser.uid,
          updatedDetails: {
            username: name,
            bio: bio,
            avatar: imagePreview,
          },
        });
        await updateProfile(authUser, {
          displayName: name,
          photoURL: imagePreview,
        });
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Error Occurred: ", error);
    } finally {
      dispatch(fetchUsers())
      setUpdateLoading(false); // End Loading State
      navigate("/"); // Navigate to Home Page
    }
  };

  // ---- Creating Uploading Image Url ----
  const createUrlHandler = async (event) => {
    setIsUrlCreated(false);
    const file = event.target.files[0];
    try {
      if (file) {
        const fileURL = await getUploadFileURL(file);
        setImagePreview(fileURL);
      }
    } catch (error) {
      console.error("Error Occurred Making URL: ", error);
    } finally {
      setIsUrlCreated(true)
    }
  };

  // ---- Updating Name Handler ----
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  // ---- Updating Bio Handler ----
  const bioChangeHandler = (event) => {
    setBio(event.target.value);
  };

  return (
    <div className="profile">
      {status === "loading" ? (
        <h1 className="text-white">Updating...</h1>
      ) : (
        <div className="profile-container">
          {/* ---- Right Side Form ---- */}
          <form onSubmit={UpdateProfileHandler}>
            <hr className="line1" />
            <h2 className="profile-head">Update Profile</h2>
            <hr className="line2" />

            {/* ---- Avatar File Input ---- */}
            <label htmlFor="profile-avatar">
              <input
                type="file"
                id="profile-avatar"
                accept=".png, .jpg, .jpeg"
                name="profile-avatar"
                onChange={createUrlHandler}
                hidden
              />
              {isUrlCreated ? <img
                src={imagePreview || assets.avatar_icon}
                alt="Profile Avatar"
                className="profile-avatar"
              />: <div className="loader"></div>}
              Choose a profile picture
            </label>

            {/* ---- Name Input ---- */}
            <input
              type="text"
              id="profile-name"
              placeholder="Enter your name."
              value={name}
              onChange={nameChangeHandler}
            />

            {/* ---- Bio Textarea ---- */}
            <textarea
              name="profile-bio"
              id="profile-bio"
              placeholder="Enter your bio"
              value={bio}
              onChange={bioChangeHandler}
            ></textarea>

            {/* ---- Form Submit Button ---- */}
            <button
              type="submit"
              className="profile-button"
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </form>

          {/* ---- Left side Info Display ---- */}
          <div className="pic-name-bio">
            {/* --- Avatar --- */}
            {console.log("Image Preview: ", authUser.photoURL)}
            <img
              className="profile-img"
              src={authUser.photoURL || assets.logo_icon}
              alt=""
            />

            {/* --- Name --- */}
            <h3>{authUser.displayName}</h3>

            {/* --- Bio --- */}
            <p>{bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
