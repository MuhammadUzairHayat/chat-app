import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../config/firebase";

export const useMessageNotifications = (authUser, selectedFriend = null) => {
  useEffect(() => {
    if (authUser) {
      const messagesRef = collection(db, "chats");
      const chatsQuery = query(
        messagesRef,
        where("participants", "array-contains", authUser.uid)
      );

      const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          const chatId = doc.id;

          // Skip notifications for the currently selected chat
          if (
            selectedFriend &&
            chatId !== `${authUser.uid}_${selectedFriend.id}`
          )
            return;

          // Listen to the `messages` subcollection
          const messagesRef = collection(db, "chats", chatId, "messages");
          const messageQuery = query(
            messagesRef,
            where("receiverId", "==", authUser.uid)
          );

          onSnapshot(messageQuery, (messageSnapshot) => {
            messageSnapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                const newMessage = change.doc.data();
                console.log("New message received: ", newMessage);

                // Show notification for the new message
                showNotification(newMessage);
              }
            });
          });
        });
      });

      return () => unsubscribe();
    }
  }, [authUser, selectedFriend]);

  const showNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("New Message", {
        body: message.message,
        icon: "/chat-app-logo.png",
      });
    } else {
      alert(`New message from ${message.senderId}: ${message.message}`);
    }
  };
};
