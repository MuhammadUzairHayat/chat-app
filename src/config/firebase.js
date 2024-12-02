import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-xjgMAzlo-qD3tJZdkXQ7eiQCadDBRH8",
  authDomain: "chat-app-gs-44a3e.firebaseapp.com",
  projectId: "chat-app-gs-44a3e",
  storageBucket: "chat-app-gs-44a3e.firebasestorage.app",
  messagingSenderId: "439145492638",
  appId: "1:439145492638:web:2061bd63c6154613e24b8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signUp = async (username, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(email, password);
        const user = response.user;

        await setDoc(doc(db, 'users', user.id), {
            id: user.id,
            avatar: "",
            username: username.toLowerCase(),
            email: email,
            bio: "Hey, I,m using chat-app"
        })

        await setDoc(doc(db, 'chats', user.id), {
            chatData: []
        })
        
    } catch (error) {
        console.error("Error creating user: ", error.message);  
        toast.error(error.code)
    }
}