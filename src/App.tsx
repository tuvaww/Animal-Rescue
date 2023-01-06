import React from "react";

import "./styles/App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./views/Home";
import { Adopt } from "./views/Adopt";
import { AnimalDetails } from "./components/animals/AnimalDetails";
import { Schedule } from "./views/Schedule";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="/Adopt" element={<Adopt />}></Route>
          <Route path="/Adopt/:id" element={<AnimalDetails />}></Route>
          <Route path="/Schedule" element={<Schedule />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
