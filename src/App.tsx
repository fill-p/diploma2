import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import Loginpage from "./Components/Loginpage/Loginpage";
import NavBar from "./Components/NavBar/NavBar";
import "./GlobalStyles.css";
import { myContext } from "./Context";

function App() {
  const userObject = useContext(myContext);
  console.log(userObject);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" Component={Homepage} />
        {userObject ? null : <Route path="/login" Component={Loginpage} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
