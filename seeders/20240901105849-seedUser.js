"use strict";

const { User } = require("../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = require("../data/user.json");

    for (const user of users) {
      await User.create({
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Profiles", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Friendships", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Comments", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Likes", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Posts", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
