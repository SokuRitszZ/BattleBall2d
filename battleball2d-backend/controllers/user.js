const express = require("express");
const {register, login, getInfo, setHeadIcon} = require("../services/user");
const path = require("path");
const router = express.Router();
const R = require("../utils/R");

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
});

const formidable = require("formidable");
const uploadDir = path.join(__dirname, "../", "public", "static", "images");

router.post("/headicon", async (req, res) => {
  const {id} = req.auth;
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadDir;
  form.parse(req, async (err, fields, file) => {
    if (err) return res.json(R.fail("保存失败：-1"));
    return res.json(await setHeadIcon(id, file.croppedImage));
  });
});

module.exports = router;