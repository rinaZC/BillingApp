const express = require("express");
const router = express.Router();
//require models from models.js files

router.post("/register", (req, res) => {
  //create new user and save
});

router.post("login", (req, res) => {
  //login using localauthorization??
  //add login via facebook later
});

module.exports = router;
