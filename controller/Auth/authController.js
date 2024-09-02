const { User } = require("../../models");
const { comparePassword } = require("../../helpers/bcrypt");
const { signToken } = require("../../helpers/jwt");
const emailValidator = require("../../helpers/emailValidator");

class AuthController {
  static async login(req, res, next) {
    try {
      const { emailOrUsername, password } = req.body;

      if (!emailOrUsername) throw { name: "MissingEmailOrUsername" };
      if (!password) throw { name: "MisingPassword" };

      const isEmail = emailValidator(emailOrUsername);

      const user = await User.findOne({
        where: isEmail
          ? { email: emailOrUsername }
          : { username: emailOrUsername },
      });

      if (!user || !comparePassword(password, user.password)) {
        throw { name: "FailAuth" };
      }

      const access_token = signToken(user.id);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, username, password } = req.body;

      const registeredUser = await User.create({
        email,
        username,
        password,
      });

      res.status(200).json({
        username: registeredUser.username,
        email: registeredUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
