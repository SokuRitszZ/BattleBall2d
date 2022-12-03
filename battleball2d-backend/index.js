const express = require("express");
const server = express();

const port = 8080;

server.get("/", async (req, res) => {
  res.end("Hello Node.js Express!");
});

server.listen(port, async () => {
  console.log(`battleball-2d backend listening at http://localhost:${port}...`);
});