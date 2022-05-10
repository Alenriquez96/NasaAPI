import React, { Component } from "react";
import Landings from "./Landings";
import Home from "./Home";
import Neas from "./Neas";
import Form from "./Form";
import List from "./List";
import NeasForm from "./NeasForm";
import {Route, Routes} from "react-router-dom";


class Main extends Component {
  render() {
    return (
      <main>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Landings/>} path="/landings"/>
          <Route element={<Neas/>} path="/neas"/>
          <Route element={<Form/>} path="landings/create"/>
          <Route element={<List/>} path="landings/list" />
          <Route element={<NeasForm/>} path="/neas/create"/>
        </Routes>
      </main>
    )
  }
}

export default Main;
