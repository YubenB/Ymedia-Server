"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Post);
      Like.belongsTo(models.User);
    }
  }
  Like.init(
    {
      PostId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Post Id cannot be empty",
          },
          notEmpty: {
            msg: "Post Id cannot be empty",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User Id cannot be empty",
          },
          notEmpty: {
            msg: "User Id cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
