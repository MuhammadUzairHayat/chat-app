// import { useState, useEffect } from 'react';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the path as per your project structure

export const getUploadFileURL = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("https://api.imgbb.com/1/upload?key=84ddf2e860b9ae9451599955bc0f7cf3", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("ImgBB URL:", data.data.url);
    return data.data.url; // Return the direct URL for use
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
  }
};

export const updateUserProfile = async (user) => {
  console.log('updated user: ', user)
    try {
      const docRef = doc(db, "users", user.id);
      await updateDoc(docRef, user.updatedDetails) 
      // const users = snapshot.docs.map((doc) => ({
      //   id: doc.id, 
      //   ...doc.data(), 
      // }));
      // return [...users];
    } catch (error) {
      console.error("Error Updating users:", error);
    }
};
  

export const getMessages = async (chatId)=> {
  // console.log(`Chat id: `, chatId)
  try {
    const messagesRef = collection(db, 'chats', chatId.trim(), 'messages');
    const querySnapshot = await getDocs(messagesRef);

    const messages = querySnapshot.docs.map(doc => ({
      id: doc.id, // Document ID
      ...doc.data(), // Document data
    }));
    
    // console.log('For Debugging: ', messages); // Debugging
    return messages; // Return the array of messages
  } catch (error) {
    console.error("Error fetching messages: ", error);
    throw error; // Handle errors appropriately
  }
}



