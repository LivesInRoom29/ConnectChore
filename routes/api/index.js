const router = require("express").Router();
const hmRoutes = require("./household-members");
//const users = require("./users");

// Household Member routes
router.use("/household-members", hmRoutes);
// router.use("/users", users)

module.exports = router;