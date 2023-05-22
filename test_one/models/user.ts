"use strict";
import { DataType, Model, UUIDV4 } from "sequelize";

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

module.exports = (
  sequelize: any,
  DataTypes: {
    UUID: DataType;
    STRING: any;
  }
) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    id!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      User.belongsToMany(models.Project, {
        through: "ProjectAssignments",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
