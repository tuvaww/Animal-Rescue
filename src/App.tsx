import React from "react";

import "./styles/App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./views/Home";
import { Adopt } from "./views/Adopt";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="/Adopt" element={<Adopt />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
