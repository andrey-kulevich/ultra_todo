import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom"
import { CookiesProvider } from 'react-cookie';
import {useRoutes} from "./hooks/useRoutes";
import {createMuiTheme} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#eeeeee' },
        secondary: { main: '#e57373' },
        success:{ main:'#4791db' }
    },
});

export default function App() {
  const routes = useRoutes()
  return (
      <ThemeProvider theme={theme}>
          <Router>
              <CookiesProvider>
                  {routes}
              </CookiesProvider>
          </Router>
      </ThemeProvider>
  );
}
