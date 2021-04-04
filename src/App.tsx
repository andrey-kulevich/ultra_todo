import React from 'react';
import './App.css';
import {
  BrowserRouter as Router
} from "react-router-dom"
import { CookiesProvider } from 'react-cookie';
import {useRoutes} from "./hooks/useRoutes";


function App() {
  const routes = useRoutes()
  return (
      <Router>
        <CookiesProvider>
          {routes}
        </CookiesProvider>
      </Router>
  );
}

export default App;
