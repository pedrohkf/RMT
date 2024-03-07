import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Header } from "./Header";
import { Home } from "./Home";
import { Users } from "./Users";
import { Items } from "./Items";
import { Login } from "./login/Login";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/items" element={<Items/>}/>
          <Route path="/login/*" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
