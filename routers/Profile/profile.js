const router = require("express").Router();
const { Profile } = require("../../controller");

router.get("/:id", Profile.getProfile);

module.exports = router;
