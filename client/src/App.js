import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { BrowserRouter } from 'react-router-dom';
import { landingContext } from "./context/landingContext";
import React, {useState} from "react";

function App() {
  const [Alllandings,setAllLandings] = useState({});
  console.log(Alllandings);


  const getAllLandings = (getAll) =>{
    setAllLandings(getAll)
  }

  const landingObj = {
    getAllLandings,
    Alllandings
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {/* Recordar siempre llamar value para pasar por context */}
        <landingContext.Provider value={landingObj}>
          <Main />
        </landingContext.Provider>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App;
