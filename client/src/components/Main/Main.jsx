import React, { Component } from "react";
import Landings from "./Landings";
import Home from "./Home";
import Neas from "./Neas";
import List from "./List";
import {Route, Routes} from "react-router-dom";
import Paginate from "./Paginate";

class Main extends Component {
  render() {
    return (
      <main>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Landings/>} path="/landings"/>
          <Route element={<Neas/>} path="/neas"/>
          <Route element={<List/>} path="landings/list"/>
          <Route element={<Paginate/>} path="/paginate"/>
        </Routes>
      </main>
    )
  }
}

export default Main;
