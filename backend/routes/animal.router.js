const express = require("express");
//const app = express();
const router = express.Router();
const animalController = require("../controllers/animal.controller");

router.get("/getAnimals", animalController.getAnimals);

router.get("/getAnimal/:id", animalController.getAnimal);

module.exports = router;
