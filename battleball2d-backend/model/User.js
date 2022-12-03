// 配置User的实体

const {
  DataTypes, Model
} = require("sequelize");

const sequelize = require("../db/config");

class User extends Model {}

User.init({
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING }
}, {
  sequelize,
  modelName: "User"
});

module.exports = User;