import "./styles/styles.scss"
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter } from 'react-router-dom';
import { landingContext } from "./context/landingContext";
import {themeContext} from './context/themeContext';
import React, {useState} from "react";

function App() {
  const [Alllandings,setAllLandings] = useState([]);
  const [theme, setTheme] = useState("");

  const toggleTheme = () => theme===""?setTheme("-dark"):setTheme("");


  const getAllLandings = (getAll) =>{
    setAllLandings(getAll)
  }

  const landingObj = {
    getAllLandings,
    Alllandings
  }

  const themeData = {
    theme,
    toggleTheme
  }

  return (
    <div className="App">
      <themeContext.Provider value={themeData}>
        <BrowserRouter>
          <Header />
          {/* Recordar siempre llamar value para pasar por context */}
          <landingContext.Provider value={landingObj}>
            <Main />
          </landingContext.Provider>
        </BrowserRouter>
        <Footer />
      </themeContext.Provider>
    </div>
  )
}

export default App;
