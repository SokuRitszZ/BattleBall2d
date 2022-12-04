const express = require("express");
const {register, login, getInfo} = require("../services/user");
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

router.get("/getinfo", async (req, res) => {
  const {id} = req.auth;
  res.json(await getInfo(id));
})

module.exports = router;