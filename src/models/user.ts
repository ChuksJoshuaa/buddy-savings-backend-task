import { DataTypes, Model, Optional } from "sequelize";
import { UserAttributes } from "../types";
import sequelize from "../db/sequelize";

type UserCreationAttributes = Optional<UserAttributes, "id">;

class User extends Model<UserAttributes | UserCreationAttributes> {
  declare id: number;
  declare email: string;
  declare username: string;
  declare password: string;
}

const UserModel = sequelize.define<User>(
  "User",
  {
    id: {
      type: new DataTypes.INTEGER(),
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
    },
    password: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default UserModel;
