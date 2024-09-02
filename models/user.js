"use strict";
const { hashPassword } = require("../helpers/bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { onDelete: "CASCADE" });
      User.hasMany(models.Post, { onDelete: "CASCADE" });
      User.hasMany(models.Comment, { onDelete: "CASCADE" });
      User.hasMany(models.Friendship, { onDelete: "CASCADE" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Username has already been used",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Username cannot be empty",
          },
          notEmpty: {
            msg: "Username cannot be empty",
          },
          is: {
            args: /^[a-zA-Z0-9_&]*$/,
            msg: "Username can only contain letters, numbers, underscores, and ampersands, and cannot contain spaces.",
          },
          len: {
            args: [3, 30],
            msg: "Username must be between 3 and 30 characters long.",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email has already been use",
        },
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email cannot be empty",
          },
          notEmpty: {
            msg: "Email cannot be empty",
          },
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password cannot be empty",
          },
          notEmpty: {
            msg: "Password cannot be empty",
          },
          len: {
            args: [6, 128],
            msg: "Password must be at least 6 characters and 128 long",
          },
          isStrongPassword(value) {
            if (!/[a-zA-Z]/.test(value)) {
              throw new Error("Password must contain at least one letter.");
            }
            if (!/[0-9]/.test(value)) {
              throw new Error("Password must contain at least one number.");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });

  User.afterCreate(async (user, options) => {
    await sequelize.models.Profile.create({
      UserId: user.id,
    });
  });

  return User;
};
