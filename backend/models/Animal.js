const mongoose = require("mongoose");

const schema = mongoose.Schema;

const animalSchema = new schema({
  id: String,
  type: String,
  name: String,
  age: Number,
  arrivedAtShelter: Date,
  price: Number,
  description: String,
  breed: String,
  weight: Number,
  isOkWithOtherAnimals: Boolean,
  health: String,
  img: Array,
});

const AnimalModel = mongoose.model("Animals", animalSchema);

module.exports = AnimalModel;
