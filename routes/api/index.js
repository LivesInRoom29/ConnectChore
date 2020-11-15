const router = require("express").Router();
const hmRoutes = require("./household-members");
const clRoutes = require("./chore-lists");
//const users = require("./users");

// Household Member routes
router.use("/household-members", hmRoutes);
router.use("/chore-lists", clRoutes);
// router.use("/users", users)

module.exports = router;