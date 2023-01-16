import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { Home } from "./views/Home";
import { Adopt } from "./views/Adopt";
import { AnimalDetails } from "./components/animals/AnimalDetails";
import { Schedule } from "./views/Schedule";
import { Register } from "./views/Register";
import { Login } from "./views/Login";
import { Provider } from "react-redux";
import Store from "./redux/Store";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="/Adopt" element={<Adopt />}></Route>
            <Route path="/Adopt/:id" element={<AnimalDetails />}></Route>
            <Route path="/Schedule" element={<Schedule />}></Route>
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
