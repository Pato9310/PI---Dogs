import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Access from "./Components/Access/Access";
import Create from "./Components/Create/Create";
import Detail from "./Components/Detail/Detail";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Access />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/breeds/:id" element={<Detail />} />
      <Route exact path="/create-breed" element={<Create />} />
    </Routes>
  );
}

export default App;
