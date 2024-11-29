// import React from 'react'

import { Route, Routes, BrowserRouter } from "react-router-dom"
import Login from "./Pages/Login/Login"
import Chat from "./Pages/Chat/Chat"
import ProfileUpdate from "./Pages/ProfileUpdate/ProfileUpdate"

const App = () => {
  return (
    <div className=''>
      <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Login />} />
        <Route path='/chat'  element={<Chat />} />
        <Route path='/profile'  element={<ProfileUpdate />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
