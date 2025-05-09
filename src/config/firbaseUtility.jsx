// import { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase"; // Adjust the path as per your project structure
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";


// ---- For generating Image Url ----
export const getUploadFileURL = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(
      "https://api.imgbb.com/1/upload?key=84ddf2e860b9ae9451599955bc0f7cf3",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("ImgBB URL:", data.data.url);
    return data.data.url; // Return the direct URL for use
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
  }
};

// ---- For generating Video Url ----
export const uploadVideoToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "video_upload_preset"); // Use the upload preset name
  formData.append("cloud_name", "dmbdp6irh"); // Replace with your Cloudinary cloud name

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dmbdp6irh/video/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log("Cloudinary Video URL:", data.secure_url);
    return data.secure_url; // Return the video URL for use
  } catch (error) {
    console.error("Error uploading video:", error);
  }
};


// ---- For updating User Profile ----
export const updateUserProfile = async (user) => {
  console.log("updated user: ", user);
  try {
    const docRef = doc(db, "users", user.id);
    await updateDoc(docRef, user.updatedDetails);
    // const users = snapshot.docs.map((doc) => ({
    //   id: doc.id,
    //   ...doc.data(),
    // }));
    // return [...users];
  } catch (error) {
    console.error("Error Updating users:", error);
  }
};

// ---- For fetching Messages ----
export const getMessages = async (chatId) => {
  // console.log(`Chat id: `, chatId)
  try {
    const messagesRef = collection(db, "chats", chatId.trim(), "messages");
    const querySnapshot = await getDocs(messagesRef);

    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));

    // console.log('For Debugging: ', messages); // Debugging
    return messages; // Return the array of messages
  } catch (error) {
    console.error("Error fetching messages: ", error);
    throw error; // Handle errors appropriately
  }
};

// ---- For Deleting Messages ----
export const deleteMessages = async (
  chatId,
  msgId,
  lastMessage,
  deletedMessage,
  isImage
) => {
  // console.log(`Chat id: `, chatId)
  try {
    const messagesRef = doc(db, "chats", chatId.trim(), "messages", msgId);
    await updateDoc(messagesRef, {
      content: "🗑️ This message has been deleted",
      img: null,
      type: "text",
    });
    
    if (isImage) {
      await updateDoc(doc(db, "chats", chatId.trim()), {
        mediaCount: increment(-1),
      });
    }

    if (deletedMessage) {
      await deleteDoc(messagesRef);
    }

    if (lastMessage) {
      await updateDoc(doc(db, "chats", chatId.trim()), {
        lastMessage: "del",
        // mediaCount : increment(-1),
        lastMessageTimestamp: Date.now(),
        lastImg: null,
      });
    }
  } catch (error) {
    console.error("Error fetching messages: ", error);
    throw error; // Handle errors appropriately
  }
};


//---- For Resetting Password ----
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    toast.success("Password reset email sent! Check your inbox.");
  } catch (error) {
    toast.error("Error resetting password:", error.message);
    console.error("Error resetting password:", error);
  }
};