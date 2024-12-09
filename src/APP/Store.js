import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "../Features/chatSlice.jsx"
import usersReducer from "../Features/userSlice.jsx"

const store = configureStore({
    reducer: {
        chats: chatsReducer,
        users: usersReducer
    },
})

export default store;