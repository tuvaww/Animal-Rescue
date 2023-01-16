const Bookings = require("../models/Booking");

exports.book = async (req, res) => {
  try {
    const user = req.body.user;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;

    await Bookings.create({ userId: user, year, month, day });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const year = req.body.year.toString();
    const month = req.body.month;

    const bookings = await Bookings.find({ year: year, month: month });

    res.status(200).send(bookings);
  } catch (err) {
    console.log(err);
  }
};
