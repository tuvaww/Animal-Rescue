require("dotenv").config();
require("./database.js");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const fs = require("fs");
const animalModel = require("./models/Animal");
const animalRoutes = require("./routes/animal.router");
const accountRoutes = require("./routes/account.router");
const bookingsRoutes = require("./routes/bookings.router");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(animalRoutes);
app.use("/account", accountRoutes);
app.use("/bookings", bookingsRoutes);

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
