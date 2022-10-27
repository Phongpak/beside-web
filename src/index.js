import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AuthContextProvider from "./context/AuthContext";
import LoadingContextProvider from "./context/LoadingContext";
import OrderContextProvider from "./context/OrderContext";
import ProfileContextProvider from "./context/ProfileContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <ProfileContextProvider>
        <OrderContextProvider>
          <AuthContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthContextProvider>
        </OrderContextProvider>
      </ProfileContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
