const {DataTypes, Model} = require("sequelize");
const sequelize = require("../index");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "111111"
  }
}, {
  tableName: "user",
  timestamps: false // 禁止创建createAt，updateAt字段
});

module.exports = User;