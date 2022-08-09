import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ChartProvider } from "./context/chart";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { MotoProvider } from "./context/MotoContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <MotoProvider>
          <ChartProvider>
            <App />
          </ChartProvider>
        </MotoProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
