const express = require("express");
//const app = express();
const router = express.Router();
const animalController = require("../controllers/animal.controller");

router.get("/getAnimals", animalController.getAnimals);

module.exports = router;
