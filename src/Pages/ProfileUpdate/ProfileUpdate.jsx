/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { useSelector } from "react-redux";
import { getUploadFileURL, updateUserProfile } from "../../config/firbaseUtility";
import { toast } from "react-toastify";
// import  BookLoaderComponent  from "./Loader";
import { AuthContext } from "../../context/AuthContext";

const ProfileUpdate = () => {
  const {authUser, setAuthUser} = useContext(AuthContext)
  const { status, users, error } = useSelector((state) => state.users);

  const [currentUser, setCurrentUser] = useState(null)
  const [imagePreview, setImagePreview] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);
  
  console.log(`update User: `, users)
  console.log(`Current User: `, authUser.uid)
  // Update state when `users` changes
  useEffect(() => {
    if (status === "succeeded" && users.length > 0) {
      const user = users.find((user)=> user.id === authUser.uid)
      console.log(`These are users: `,users)
      setCurrentUser(user)
      setImagePreview(user?.avatar || assets.avatar_icon);
      setName(user?.username || "User Name");
      setBio(
        user?.bio || "Assalam-o-Alaikum! I hope you be in Good tune 😊."
      );
    }
  }, [status, users]);

  const UpdateProfileHandler = async (event) => {
    event.preventDefault();
    setUpdateLoading(true)

    
    try {
     if (currentUser) {
      console.log(`yes`)
      await updateUserProfile({
        id: authUser.uid,
        updatedDetails: {
          username: name,
          bio: bio,
          avatar: imagePreview,
        },
      });
     }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Error Occurred: ", error);
    } finally {
      setUpdateLoading(false); // End loading state
    }
  };

  const handleFileChange = async  (event) => {
    const file = event.target.files[0];
    try {
      if (file) {
        const fileURL =await getUploadFileURL(file);
        setImagePreview(fileURL);
      }
    } catch (error) {
      console.error('Error Occurred Making URL: ', error)
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
       {status === "loading" ? `<BookLoaderComponent />` :
             <div className="profile-container">

             <form onSubmit={UpdateProfileHandler}>
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
                 alt="Profile Avatar"
                 className="profile-avatar"
               />
               Choose a profile picture
             </label>
             <input
               type="text"
               id="profile-name"
               placeholder="Enter your name."
               value={name}
               onChange={nameChangeHandler}
             />
             <textarea
               name="profile-bio"
               id="profile-bio"
               placeholder="Enter your bio"
               value={bio}
               onChange={bioChangeHandler}
             ></textarea>
             <button type="submit" className="profile-button" disabled={updateLoading}>
               {updateLoading ? "Updating..." : "Update"}
             </button>
           </form>
           <div className="pic-name-bio">
             <img
               className="profile-img"
               src={imagePreview || assets.logo_icon}
               alt=""
             />
             <h3>{name}</h3>
             <p>{bio}</p>
           </div></div>}
      
    </div>
  );
};

export default ProfileUpdate;
