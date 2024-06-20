"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mysql_1 = require("../mysql/mysql");
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
}
exports.User = mysql_1.sequelize.define("User", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: sequelize_1.DataTypes.TIME,
    },
    points: {
        type: sequelize_1.DataTypes.FLOAT,
    },
}, { modelName: "Users", tableName: "user", timestamps: false });
