import React, { useState, createContext, useEffect } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./components/Routes/Routes";
import "./App.css";

export const AuthContext = createContext();
export const APIContext = createContext();

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const AuthState = {user, setUser};
  const APIState = {username, setUsername, city, setCity, isAdmin, setIsAdmin};

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      userHasAuthenticated(false);
    }
  }

  // Get current user upon initial load
  useEffect(() => {
    // window.sessionStorage.setItem("cookieMessageRead", "true");
    onLoad();
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ ...AuthState }}>
        <APIContext.Provider value={{ ...APIState }}>
          <Router>
            <Routes appProps={{ isAuthenticated, userHasAuthenticated }}></Routes>
          </Router>
        </APIContext.Provider>
      </AuthContext.Provider>
    </div>
  );
};

export default App;