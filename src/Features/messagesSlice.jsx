import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
// import { useGetData } from "../config/firbaseUtility";

const initialState = {
  Status: "idle",
  chats: [],
  chatsError: null,
};

export const fetchChats = createAsyncThunk("chats/fetchChats", async (_, { rejectWithValue }) => {
  try {
    const colRef = collection(db, "chats");
    let unsubscribe = null;

    return new Promise((resolve, reject) => {
      unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const chats = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          resolve(chats);
        },
        (error) => {
          reject(rejectWithValue(error.message));
        }
      );
    });

    return () => unsubscribe && unsubscribe(); // Cleanup the listener
  } catch (error) {
    console.error("Error fetching chats:", error);
    return rejectWithValue(error.message);
  }
});


const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addMessage: (state, action) => void state.push(action.payload),
    clearMessages: (state) => void (state.length = 0),
  },
  extraReducers(builder) {
    builder
    .addCase(fetchChats.fulfilled, (state, action) => {
      state.chatsStatus = "succeeded";
      state.chats = action.payload; 
    })
    .addCase(fetchChats.pending, (state) => {
      state.chatsStatus = "loading";
    })
    .addCase(fetchChats.rejected, (state, action) => {
      console.log("Error Occurred: ", action.error.message)
      state.chatsStatus = "failed";
      state.error = action.error.message || "Failed to fetch users"; 
    })
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
