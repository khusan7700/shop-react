import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import "./css/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./app/MaterialTheme";
import ContextProvider from "./app/hooks/ContextProvider";
import { SocketProvider } from "./app/context/SocketContext";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <SocketProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
              <App />
            </Router>
          </ThemeProvider>
        </SocketProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
