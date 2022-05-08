import React, { Component } from "react";
import Landings from "./Landings";
import Home from "./Home";
import Neas from "./Neas";
import {Route, Routes} from "react-router-dom";

class Main extends Component {
  render() {
    return (
      <main>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Landings/>} path="/landings"/>
          <Route element={<Neas/>} path="/neas"/>
        </Routes>
      </main>
    )
  }
}

export default Main;
