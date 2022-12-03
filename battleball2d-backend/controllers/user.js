const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.end("This is user api page");
});

router.post("/register", (req, res) => {
  res.send("This is register api page.");
});

router.get("/login", (req, res) => {
  res.send("This is login api page.");
});

module.exports = router;