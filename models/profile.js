"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId cannot be empty",
          },
          notEmpty: {
            msg: "UserId cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
