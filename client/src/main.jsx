import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
