import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const initialState = {
  chatsStatus: "idle",
  chats: [],
  chatsError: null,
};

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const colRef = collection(db, "chats");
      let unsubscribe = null;

      return new Promise((resolve, reject) => {
        unsubscribe = onSnapshot(
          colRef,
          async (snapshot) => {
            const chats = await Promise.all(
              snapshot.docs.map(async (doc) => {
                const chatData = doc.data();
                const chatId = doc.id;
                
                // Fetch messages for this specific chatId
                const messagesRef = collection(db, "chats", chatId, "messages");
                const messagesSnapshot = await getDocs(query(messagesRef, orderBy("timestamp", "asc")));

                const messages = messagesSnapshot.docs.map((msgDoc) => ({
                  id: msgDoc.id,
                  ...msgDoc.data(),
                }));

                return {
                  id: chatId,
                  ...chatData,
                  messages, // Attach messages to each chat
                };
              })
            );

            resolve(chats);
            // console.log("Chats with messages: ", chats);
          },
          (error) => {
            reject(rejectWithValue(error.message));
          }
        );
      });

      // Cleanup listener when done
      return () => unsubscribe && unsubscribe();
    } catch (error) {
      console.error("Error fetching chats:", error);
      return rejectWithValue(error.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: { },
  extraReducers(builder) {
    builder
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.chatsStatus = "succeeded";
        state.chats = action.payload; // Now contains chats and their messages
      })
      .addCase(fetchChats.pending, (state) => {
        state.chatsStatus = "loading";
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.chatsStatus = "failed";
        state.chatsError = action.error.message || "Failed to fetch chats";
      });
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
