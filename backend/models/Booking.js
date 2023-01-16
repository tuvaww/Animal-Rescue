const mongoose = require("mongoose");

const schema = mongoose.Schema;

const bookingSchema = new schema({
  userId: String,
  year: String,
  month: String,
  day: String,
});

const BookingModel = mongoose.model("Bookings", bookingSchema);

module.exports = BookingModel;
