import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@mui/material";
import darkTheme from "./style/MuiStyles";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={darkTheme}>
              <App />
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);
