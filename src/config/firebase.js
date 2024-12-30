import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
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


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (username, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;

        // Add user to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            avatar: "",
            username: username.toLowerCase(),
            email: email,
            createdAt: Date.now(),
            bio: "Hey, I’m using chat-app"
        });

        // Initialize empty chat data
        // await setDoc(doc(db, 'chats'));

        // await setDoc(doc(db, 'messages'))

        console.log("User successfully registered!");
    } catch (error) {
        console.error("Error creating user: ", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" ")); 
    }
};

const signIn = async (email, password)=> {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error creating user: ", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" ")); // Ensure `toast` is correctly initialized if used.
    }
}

const logout = async () => {
    try {
        await signOut(auth) 
    } catch (error) {
        console.error("Error creating user: ", error.message);
        toast.error(error.code.split('/')[1].split('-').join(" ")); // Ensure `toast` is correctly initialized if used.  
    }
}

export { signUp, signIn, logout, auth, db };