"use strict";
import { DataType, Model, UUIDV4 } from "sequelize";

interface ProjectAttributes {
  id: string;
  title: string;
}

module.exports = (
  sequelize: any,
  DataTypes: {
    INTEGER: DataType;
    STRING: DataType;
  }
) => {
  class Project extends Model<ProjectAttributes> implements ProjectAttributes {
    id!: string;
    title!: string;

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Project.belongsToMany(models.User, {
        through: "ProjectAssignments",
      });
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
