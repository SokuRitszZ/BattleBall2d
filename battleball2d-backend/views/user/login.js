const express = require("express");
const router = express.Router();

const User = require("../../model/User");

router.post("/login", async (req, resp) => {
  const {username, password} = req.body;
  const user = User.findOne({
    where: {
      username,
      password
    }
  });
  resp.json(user);
});