const express = require("express");
const router = express.Router();
const rewardController = require("../../controllers/reward-controller");
const passport = require("passport");
// for authenticating routes
//require("../../config/passport")(passport);
//const jwt = require("jsonwebtoken");


// Use PASSPORT to authenticate

// Matches with "/api/rewards"
// get all rewards
//add authentication with:
// router.get("/", passport.authenticate("jwt", {session: false}),
router.get("/",
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
router.post("/", async function(req, res) {
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
router.get("/:id", async function(req, res) {
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
router.put("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await rewardController.update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;