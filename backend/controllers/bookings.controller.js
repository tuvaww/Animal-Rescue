const Bookings = require("../models/Booking");
const Request = require("../models/Requests");

exports.book = async (req, res) => {
  try {
    const user = req.body.user;
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;

    await Bookings.create({ userId: user, year, month, day });
    res.sendStatus(200);
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

exports.getBookingByUser = async (req, res) => {
  try {
    const userId = req.body.id;

    const bookings = await Bookings.find({ userId });

    res.status(200).send(bookings);
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const userId = req.body.id;

    await Bookings.deleteOne({ userId, day, month, year });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};

exports.createRequest = async (req, res) => {
  try {
    const Animals = req.body.animals;
    const fn = req.body.firstName;
    const ln = req.body.lastName;
    const Name = fn + " " + ln;
    const Email = req.body.email;
    const Phone = req.body.phone;

    await Request.create({ Animals, Name, Email, Phone });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
