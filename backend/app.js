require("dotenv").config();
require("./database.js");

const express = require("express");
const app = express();
const fs = require("fs");
//const mongoose = require("mongoose");
const animalModel = require("./models/Animal");

const PORT = 8000;

app.use(express.json());

const data = JSON.parse(fs.readFileSync("./api/Animals.json", "utf-8"));

const importData = async () => {
  for (animal of data) {
    const checkIfAnimalExists = await animalModel.exists({ id: animal.id });

    if (!checkIfAnimalExists) {
      try {
        await animalModel.create(animal);
        console.log("data successfully imported");
      } catch (error) {
        console.log("error", error);
      }
    }
  }
};

importData();

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
