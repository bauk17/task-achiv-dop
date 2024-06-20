"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../mysql/mysql");
const User_1 = require("./User");
class Tasks extends sequelize_1.Model {
}
exports.Task = mysql_1.sequelize.define("Task", {
    task_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    task: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    created_at: {
        type: sequelize_1.DataTypes.TIME,
    },
    isDone: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
}, { modelName: "Tasks", tableName: "tasks", timestamps: false });
User_1.User.hasMany(exports.Task, { foreignKey: "user_id" });
exports.Task.belongsTo(User_1.User, { foreignKey: "user_id" });
