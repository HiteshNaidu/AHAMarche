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
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [city, setCity] = useState("");
  const [cityItem, setCityItem] = useState({});
  const [isDriver, setIsDriver] = useState(false);
  const [isDriverActive, setIsDriverActive] = useState(false);
  const [deliveriesCompleted, setDeliveriesCompleted] = useState(0);
  const [vehicleType, setVehicleType] = useState("");
  const [linkToS3, setLinkToS3] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [itemList, setItemList] = useState([]);
  const [realLocation, setRealLocation] = useState({});

  const AuthState = {user, setUser};
  const APIState = {
    username, 
    setUsername, 
    city, 
    setCity,
    cityItem,
    setCityItem,
    firstname,
    setFirstname,
    lastname,
    setLastname, 
    isDriver, 
    setIsDriver,
    isDriverActive,
    setIsDriverActive,
    deliveriesCompleted,
    setDeliveriesCompleted,
    vehicleType,
    setVehicleType,
    linkToS3,
    setLinkToS3,
    selectedCategory,
    setSelectedCategory,
    itemList,
    setItemList,
    realLocation,
    setRealLocation,
  };

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