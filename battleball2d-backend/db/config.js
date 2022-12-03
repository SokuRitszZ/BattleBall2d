// Usage: https://sequelize.org/docs/v6/getting-started/
const {
  Sequelize
} = require("sequelize");

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/battleball2d.db",
  logging: console.log
});

sequelize.sync({
  force: false
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (e) {
    console.error("Unable to connect to the database: ", e);
  }
})();

module.exports = sequelize;