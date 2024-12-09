import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
// import { useGetData } from "../config/firbaseUtility";

const initialState = {
  status: "idle",
  chats: [],
  error: null,
};

export const fetchChats = createAsyncThunk("chats/fetchChats", async () => {
  try {
    const colRef = collection(db, "chats");
    const snapshot = await getDoc(colRef);
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return [...users];
  } catch (error) {
    console.error(`Error in Fetching: `, error);
  }
});

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    addMessage: (state, action) => void state.push(action.payload),
    clearMessages: (state) => void (state.length = 0),
  },
  // extraReducers(builder) {
  //   builder.addCase(fetchChats.fulfilled, async (state, action) => {
  //     state.status = "succeeded";
  //     state.chats = [...action.payload];
  //   });
  // },
});

export const { addMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
