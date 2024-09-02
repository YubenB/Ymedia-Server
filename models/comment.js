"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post);
      Comment.belongsTo(models.User);
    }
  }
  Comment.init(
    {
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
      commentText: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Comment cannot be empty",
          },
          notEmpty: {
            msg: "Comment cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
