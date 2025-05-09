import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./APP/Store.js";
import { fetchUsers } from "./Features/userSlice.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { fetchChats } from "./Features/chatSlice.jsx";
import { ImgModalProvider } from "./context/ImageModal/imgModalContext.jsx";
import ImgModal from "./context/ImageModal/ImgModal.jsx";
import { DelModalProvider } from "./context/DeleteModal/delModalContext.jsx";
store.dispatch(fetchUsers());
store.dispatch(fetchChats());

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <ImgModalProvider>
            <DelModalProvider>
              <App />
            </DelModalProvider>
          </ImgModalProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
