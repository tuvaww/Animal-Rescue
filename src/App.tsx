import React from "react";
import Card from "@mui/material/Card";

import "./styles/App.scss";
import { Header } from "./components/layout/Header";

function App() {
  return (
    <main className="mainContainer">
      <Header></Header>
      <section className="cardContainer">
        <Card
          sx={{ backgroundColor: "#FFDEB4", width: "80%", padding: "20px" }}
        >
          <h5 className="cardHeader">About us</h5>
          <span>
            Animal Rescue is not a profit-driven company but runs on donations
            and help from volunteers. We have been in Malaga for 40 years and
            have helped over 5000 homeless animals over the years.
          </span>
        </Card>
        <Card
          sx={{ backgroundColor: "#FFF9CA", width: "42.5%", padding: "20px" }}
        >
          <h5 className="cardHeader">Donate to help</h5>
          <span>länk</span>
        </Card>
        <Card
          sx={{ backgroundColor: "#FFB4B4", width: "30%", padding: "20px" }}
        >
          <h5 className="cardHeader">Adopt a animal</h5>
          <span>länk</span>
        </Card>
      </section>
    </main>
  );
}

export default App;
