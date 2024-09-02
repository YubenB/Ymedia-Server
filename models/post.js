"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.hasMany(models.Like);
      Post.hasMany(models.Comment);
    }
  }
  Post.init(
    {
      caption: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Caption cannot be null",
          },
          notEmpty: {
            msg: "Caption cannot be empty",
          },
        },
      },
      imgUrl: { type: DataTypes.STRING, allowNull: true },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId cannot be null",
          },
          notEmpty: {
            msg: "UserId cannot be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
