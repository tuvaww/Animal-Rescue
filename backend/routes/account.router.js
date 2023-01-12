const express = require("express");
const router = express.Router();
const controller = require("../controllers/account.controller");

router.post("/create-user", controller.createUser);
router.post("/login", controller.login);

module.exports = router;
