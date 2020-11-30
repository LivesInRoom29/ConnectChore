const express = require("express");
const router = express.Router();
const rewardController = require("../../controllers/reward-controller");
const passport = require("passport");

// Matches with "/api/rewards"
// get all rewards
// Auth OK: router.get("/",
router.get("/", passport.authenticate("jwt", {session: false}),
  async function(req, res) {
    try {
      const data = await rewardController.findAll();
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

// To create a new reward
// Auth OK: router.post("/", async function(req, res) {
router.post("/", passport.authenticate("jwt", {session: false}), async function(req, res) {
  const { descriptionId, householdMemberId, userId } = req.body

  try {
    const data = await rewardController.create({
      descriptionId: descriptionId,
      householdMemberId: householdMemberId,
      userId: userId
    });
    res.json(data);
  } catch (err) {
    res.status(503).json(err);
  }
});

// Matches with "/api/rewards/:id"
// get one reward by id
// Auth OK: router.get("/:id", async function(req, res) {
router.get("/:id", passport.authenticate("jwt", {session: false}), async function(req, res) {
  const id = req.params.id;
  try {
    const data = await rewardController.findById(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// update a reward by id
// in req.body, can pass in updated description (ref to rewardDescription)
// Use this to "delete" as well - pass in {isDeleted: true}
// Auth OK: router.put("/:id", async function(req, res) {
router.put("/:id", passport.authenticate("jwt", {session: false}), async function(req, res) {
  const id = req.params.id;
  try {
    const data = await rewardController.update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;