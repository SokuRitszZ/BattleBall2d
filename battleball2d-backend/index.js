const express = require("express");
const server = express();
const port = 8080;

const User = require("./model/User");

const JWT = require("express-jwt").expressjwt;

// Nodejs JWT中间件
server.use(JWT({
  secret: "12324rhowjhfdkvjbwjekrwruio2rhp233t92ghtiuewrhgoihqebrkgljfkgjgv,mhnsjh",
  algorithms: ["HS256"]
}).unless({
  path: ["/user"]
}));

// 检测生成的实体
// const andrew = User.build({
//   username: "andrew"
// });
// console.log(andrew instanceof User); => true
// console.log(andrew.username); => 直接访问用户名

// 更新实体
// (async () => {
//   // 创建实体（保存到数据库中）
//   const andrew = await User.create({ username: "Andrew", password: "llyihs1729" });
//   andrew.username = "Leung";
//   await andrew.save();
// })();


[

]


server.get("/", async (req, resp) => {
  resp.json({
    title: "BattleBall2d-Remaster"
  });
});

server.get("/user", async (req, resp) => {
  const users = await User.findAll();
  resp.json(users);
});

server.listen(port, async () => {
  console.log(`BattleBall2d-backend listening at http://localhost:${port}`);
});