const express = require("express");
const {register, login} = require("../services/user");
const router = express.Router();

router.get("/", (req, res) => {
  res.end("This is user api page");
});

router.post("/register", async (req, res) => {
  const {
    username, password, confirmedPassword
  } = req.body;
  res.json(await register(username, password, confirmedPassword));
});

router.get("/login", async (req, res) => {
  const {
    username, password
  } = req.query;
  res.json(await login(username, password));
});

module.exports = router;