const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const findUser = await User.findOne({ email: email });

    if (findUser) {
      res.sendStatus(403);
      return;
    } else {
      res.sendStatus(200);
      await User.create({ firstName, lastName, email, password });
    }
  } catch (err) {
    console.log("error", err);
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  try {
    const findUser = await User.findOne({ email: email });
    const loggedInToken = process.env.LOGGED_IN_TOKEN;
    if (findUser.password === pass) {
      res.status(200).send({ token: loggedInToken, id: findUser._id });
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log("error", err);
  }
};

exports.getUserData = async (req, res) => {
  try {
    const id = req.body.id;

    const findUser = await User.findOne({ _id: id });

    res.status(200).send(findUser);
  } catch (err) {
    console.log(err);
  }
};
