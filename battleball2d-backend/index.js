const express = require("express");
const server = express();

/// test
require("./test");

const port = 8080;

/// middlewares
const cors = require("cors");
server.use(cors());

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());
/// middlewares end

server.get("/", async (req, res) => {
  res.end("Hello Node.js Express!");
});

const userController = require("./controllers/user");
server.use("/user", userController);

server.listen(port, async () => {
  console.log(`battleball-2d backend listening at http://localhost:${port}...`);
});