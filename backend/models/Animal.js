const mongoose = require("mongoose");

const schema = mongoose.Schema;

const animalSchema = new schema({
  id: String,
  type: String,
  name: String,
  age: Number,
  arrivedAtShelter: String,
  price: Number,
  description: String,
  breed: String,
  weight: Number,
  isOkWithOtherAnimals: Boolean,
  health: String,
  img: Array,
  gender: String,
});

const AnimalModel = mongoose.model("Animals", animalSchema);

module.exports = AnimalModel;
