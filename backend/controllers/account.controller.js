const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    await User.create({ firstName, lastName, email, password });
  } catch (err) {
    console.log("error", err);
  }
};

exports.login = async (req, res) => {
  const email = req.body.email;
  const pass = req.body.password;
  try {
    const findUser = await User.findOne({ email: email });

    if (findUser.password === pass) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log("error", err);
  }
};
