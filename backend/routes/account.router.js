const express = require("express");
const router = express.Router();
const controller = require("../controllers/account.controller");

router.post("/create-user", controller.createUser);
router.post("/login", controller.login);
router.post("/get-user", controller.getUserData);
router.delete("/delete", controller.delete);

module.exports = router;
