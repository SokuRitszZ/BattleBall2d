const express = require("express");
const server = express();
const {
  JWT_SECRETKEY
} = require("./config.json");

/// test
require("./test");

const port = 8080;

/// middlewares
const cors = require("cors");
server.use(cors());

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

const jwt = require("express-jwt").expressjwt;
server.use(jwt({
  secret: JWT_SECRETKEY,
  algorithms: ["HS256"]
}).unless({
  path: [
    "/api/user/login",
    "/api/user/register"
  ]
}));
server.use((err, req, res, next) => {
  // 无效JWT
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token.");
  }
});

/// middlewares end

/// routes
const router = express.Router();
router.get("/", async (req, res) => {
  res.end("Hello Node.js Express!\nThis is jwt test page.\nIf you can enter this page, it seems that you jwt is available!");
});

const userController = require("./controllers/user");
router.use("/user", userController);
/// routes end

server.use("/api", router);

server.listen(port, async () => {
  console.log(`battleball-2d backend listening at http://localhost:${port}...`);
});
