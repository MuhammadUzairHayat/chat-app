import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  updateProfile,
  GoogleAuthProvider,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-xjgMAzlo-qD3tJZdkXQ7eiQCadDBRH8",
  authDomain: "chat-app-gs-44a3e.firebaseapp.com",
  projectId: "chat-app-gs-44a3e",
  storageBucket: "chat-app-gs-44a3e.firebasestorage.app",
  messagingSenderId: "439145492638",
  appId: "1:439145492638:web:2061bd63c6154613e24b8f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (username, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = response.user;

    await updateProfile(user, {
      displayName: username, // Set the username as the displayName
    });

    // Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      avatar: "",
      username: username,
      email: email,
      createdAt: Date.now(),
      bio: "Hey, I’m using chat-app",
    });

    await setDoc(doc(db, "chats", `${user.uid}_${user.uid}`), {
      participants: [user.uid, user.uid], // Replace with actual user IDs
      lastMessage: null,
      lastImg: null,
      lastMessageTimestamp: Date.now(),
      isGroup: false, // Adjust based on whether it’s a group chat
    });

    await addDoc(
      collection(db, "chats", `${user.uid}_${user.uid}`, "messages"),
      {
        senderId: user.uid,
        content: null,
        timestamp: Date.now(),
        type: null,
        img: null,
      }
    );

    console.log("User successfully registered!");
  } catch (error) {
    console.error("Error creating user: ", error.message);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user: ", error.message);
    toast.error(error.code.split("/")[1].split("-").join(" ")); // Ensure `toast` is correctly initialized if used.
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error creating user: ", error.message);
    toast.error(error.code.split("/")[1].split("-").join(" ")); // Ensure `toast` is correctly initialized if used.
  }
};

export { signUp, signIn, logout, auth, db };

export const deleteAccountAndHandleChats = async (email, password) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("No user is currently signed in.");
    return;
  }

  const userId = user.uid;

  try {
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);

    await handleChatsForDeletedUser(userId);

    await deleteDoc(doc(db, "users", userId));

    await deleteUser(user);

    toast.call("Account and associated data deleted successfully.");
  } catch (error) {
    if (error.code === "auth/requires-recent-login") {
      toast.error("Reauthentication required. Ask the user to log in again.");
    } else {
      toast.error("Error deleting account:", error.message);
      console.error("Error deleting account:", error);
    }
  }
};

export const handleChatsForDeletedUser = async (userId) => {
  const userChatsQuery = query(
    collection(db, "chats"),
    where("participants", "array-contains", userId)
  );
  const querySnapshot = await getDocs(userChatsQuery);

  for (const chatDoc of querySnapshot.docs) {
    const chatData = chatDoc.data();

    await deleteDoc(doc(db, "chats", chatDoc.id));
    console.log(`Deleted chat: ${chatDoc.id}`);
  }
};
