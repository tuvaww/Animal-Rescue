const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookings.controller");

router.post("/Book", bookingsController.book);

router.post("/Get-bookings", bookingsController.getAllBookings);

module.exports = router;
