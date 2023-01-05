const Animals = require("../models/Animal");

exports.getAnimals = async (req, res) => {
  try {
    const getAnimals = await Animals.find();
    res.status(200).send(getAnimals);
  } catch (err) {
    console.log("error ocured at getAnimal controller", err);
  }
};

exports.getAnimal = async (req, res) => {
  try {
    const id = req.params.id;
    const getAnimal = await Animals.findOne({ id: id });
    res.status(200).send(getAnimal);
  } catch (err) {
    console.log("error ocured at getAnimal controller", err);
  }
};
