const router = require("express").Router();
const auth = require("./Auth/auth");
const profile = require("./Profile/profile");

router.use("/", auth);
router.use("/profile", profile);

module.exports = router;
