const mongoose = require("mongoose");

const schema = mongoose.Schema;

const requestSchema = new schema({
  Animals: Array,
  Name: String,
  Email: String,
  Phone: String,
});

const RequestModel = mongoose.model("Requests", requestSchema);

module.exports = RequestModel;
