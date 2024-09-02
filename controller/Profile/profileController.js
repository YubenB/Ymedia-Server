const { Profile } = require("../../models");

class ProfileController {
  static async getProfile(req, res, next) {
    try {
      const profile = await Profile.findByPk(1);

      res.status(200).json({
        profile,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;
