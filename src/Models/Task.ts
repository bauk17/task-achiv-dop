import { DataTypes, Model } from "sequelize";
import { sequelize } from "../mysql/mysql";
import { User } from "./User";

class Tasks extends Model {
  task_id!: number;
  task!: string;
  description!: string;
  created_at!: Date;
  isDone!: boolean;
  user_id!: number;
}

export const Task = sequelize.define<Tasks>(
  "Task",
  {
    task_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.TIME,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  { modelName: "Tasks", tableName: "tasks", timestamps: false }
);

User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });
