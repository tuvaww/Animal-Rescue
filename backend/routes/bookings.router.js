const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookings.controller");

router.post("/Book", bookingsController.book);

router.post("/Get-bookings", bookingsController.getAllBookings);

router.post("/get-by-user", bookingsController.getBookingByUser);

module.exports = router;
