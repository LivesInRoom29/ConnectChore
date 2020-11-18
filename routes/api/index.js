const router = require("express").Router();
const hmRoutes = require("./household-members");
const clRoutes = require("./chore-lists");
const taskRoutes = require("./tasks");
const rewardsRoutes = require("./rewards");
const rewardDescriptionRoutes = require("./reward-descriptions");

//const users = require("./users");

// Household Member routes
router.use("/household-members", hmRoutes);
router.use("/chore-lists", clRoutes);
router.use("/tasks", taskRoutes);
router.use("/rewards", rewardsRoutes);
router.use("/reward-descriptions", rewardDescriptionRoutes);
// router.use("/users", users)

module.exports = router;