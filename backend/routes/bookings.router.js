const express = require("express");
const router = express.Router();
const bookingsController = require("../controllers/bookings.controller");

router.post("/Book", bookingsController.book);

router.post("/Get-bookings", bookingsController.getAllBookings);

router.post("/get-by-user", bookingsController.getBookingByUser);

router.delete("/delete", bookingsController.delete);

router.post("/create-request", bookingsController.createRequest);

module.exports = router;
