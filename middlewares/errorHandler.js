module.exports = (error, req, res, next) => {
  console.log(error);

  if (
    error.name === "SequelizeUniqueConstraintError" ||
    error.name === "SequelizeValidationError"
  ) {
    res.status(400).json({
      message: error.errors[0].message,
    });
  }

  if (error.name === "MissingEmailOrUsername") {
    res.status(400).json({
      message: "Email or Username cannot be empty",
    });
  }
  if (error.name === "MissingEmail") {
    res.status(400).json({
      message: "Email cannot be empty",
    });
  }
  if (error.name === "MissingUsername") {
    res.status(400).json({
      message: "Username cannot be empty",
    });
  }
  if (error.name === "MisingPassword") {
    res.status(400).json({
      message: "Password cannot be empty",
    });
  }
  if (error.name === "FailAuth") {
    res.status(401).json({
      message: "Invalid email or password",
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
