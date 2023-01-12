const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
