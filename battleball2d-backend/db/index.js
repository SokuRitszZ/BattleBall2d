const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/battleball2d.db",
  logging: console.log // 日志输出方式
});

sequelize.sync();

module.exports = sequelize;