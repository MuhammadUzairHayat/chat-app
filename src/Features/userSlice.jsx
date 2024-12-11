import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../config/firebase";

const initialState = {
  status: "idle",
  users: [],
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const colRef = collection(db, "users");
    const snapshot = await getDocs(colRef); 
    const users = snapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(), 
    }));
    return [...users];
  } catch (error) {
    console.error("Error fetching users:", error);
  }
});

// export const updateProfile = createAsyncThunk("users/updateProfile", async (user) => {
//   try {
//     const docRef = collection(db, "users", user.id);
//     const snapshot = await updateDoc(docRef, user.updatedDetail) 
//     const users = snapshot.docs.map((doc) => ({
//       id: doc.id, 
//       ...doc.data(), 
//     }));
//     return [...users];
//   } catch (error) {
//     console.error("Error fetching users:", error);
//   }
// });

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload; 
    })
    .addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      console.log("Error Occurred: ", action.error.message)
      state.status = "failed";
      state.error = action.error.message || "Failed to fetch users"; 
    })
  },
});


export {}
export default usersSlice.reducer;
