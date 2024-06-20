import { sequelize } from "../mysql/mysql";
import { DataTypes, Model } from "sequelize";
import { Task } from "./Task";

class Users extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly created_at!: Date;
  public points!: number;
}

export const User = sequelize.define<Users>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.TIME,
    },
    points: {
      type: DataTypes.FLOAT,
    },
  },
  { modelName: "Users", tableName: "user", timestamps: false }
);
