import { DataTypes, Model, Optional } from "sequelize";
import { BuddyAttributes } from "../types";
import sequelize from "../db/sequelize";

type BuddyCreationAttributes = Optional<BuddyAttributes, "id">;

class Buddy extends Model<BuddyAttributes | BuddyCreationAttributes> {
  declare id: number;
  declare title: string;
  declare buddies: number;
  declare creator: number;
  declare buddiesJoined: any[];
  declare buddiesTarget: string;
  declare savingMethod: string;
  declare savingFrequency: string;
  declare savingAmount: number | string;
  declare startSaving: Date;
  declare endSaving: Date;
  declare savingDuration: string;
  declare buddiesRelationship: string;
}

const BuddyModel = sequelize.define<Buddy>(
  "Buddy",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },

    buddies: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },

    creator: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },

    buddiesJoined: {
      type: new DataTypes.JSON(),
      defaultValue: [],
    },

    buddiesTarget: {
      type: new DataTypes.ENUM(),
      values: ["yes", "no"],
      defaultValue: "no",
    },

    savingMethod: {
      type: new DataTypes.ENUM(),
      values: ["automatic", "manual"],
      defaultValue: "automatic",
    },

    savingFrequency: {
      type: new DataTypes.ENUM(),
      values: ["daily", "weekly", "monthly"],
      defaultValue: "monthly",
    },

    savingAmount: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },

    savingDuration: {
      type: new DataTypes.ENUM(),
      values: ["3 months", "6 months", "1 year"],
      defaultValue: "3 months",
    },

    startSaving: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },

    endSaving: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },

    buddiesRelationship: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default BuddyModel;
