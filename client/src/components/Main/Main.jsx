import React, { useContext } from "react";
import Landings from "./Landings";
import Home from "./Home";
import Neas from "./Neas";
import Form from "./Form";
import List from "./List";
import NeasForm from "./NeasForm";
import Detail from "./List/Card/Detail";
import {Route, Routes} from "react-router-dom";
import { themeContext } from "../../context/themeContext";


function Main () {
  const {theme} = useContext(themeContext)
  const darkMode = "main"+theme

    return (
      <main className={darkMode}>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<Landings/>} path="/landings"/>
          <Route element={<Neas/>} path="/neas"/>
          <Route element={<Form/>} path="landings/create"/>
          <Route element={<List/>} path="landings/list" />
          <Route element={<NeasForm/>} path="/neas/create"/>
          <Route element={<Detail/>} path="landings/detail"/>
        </Routes>
      </main>
    )
}

export default Main;
