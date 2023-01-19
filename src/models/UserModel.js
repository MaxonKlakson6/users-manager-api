const { DataTypes } = require("sequelize");

const sequelize = require("../database/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastLogin: {
    type: DataTypes.STRING,
    defaultValue: "",
  },
  onlineStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
