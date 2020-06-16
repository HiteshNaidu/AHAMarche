import React, { useState, createContext, useEffect } from "react";
// import { Auth } from "aws-amplify";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./components/Routes/Routes";
import "./App.css";
// import { createMuiTheme } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles';
// import { blue } from '@material-ui/core/colors';

// const theme = createMuiTheme({
//   palette: {
//     // primary: blue,
//     primary: {
//       main: blue[400],
//     },
//   },
// });

export const AuthContext = createContext();
export const APIContext = createContext();

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  const AuthState = {};
  const APIState = {};

  async function onLoad() {
    // try {
    //   await Auth.currentSession();
    //   userHasAuthenticated(true);
    // } catch (e) {
    //   userHasAuthenticated(false);
    // }
    userHasAuthenticated(false);
  }

  // Get current user upon initial load
  useEffect(() => {
    // window.sessionStorage.setItem("cookieMessageRead", "true");
    onLoad();
  }, []);

  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
        <AuthContext.Provider value={{ ...AuthState }}>
          <APIContext.Provider value={{ ...APIState }}>
            <Router>
              <Routes appProps={{ isAuthenticated, userHasAuthenticated }}></Routes>
            </Router>
          </APIContext.Provider>
        </AuthContext.Provider>
      {/* </ThemeProvider> */}
    </div>
  );
};

export default App;