const express = require("express");
const router = express.Router();
const rewardDescriptionController = require("../../controllers/reward-description-controller");
const passport = require("passport");

// Matches with "/api/reward-descriptions"
// get all reward descriptions
//add authentication with:
// Auth OK: router.get("/",
router.get("/", passport.authenticate("jwt", {session: false}),
  async function (req, res) {
    try {
      const data = await rewardDescriptionController
        .findAll();
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

// To create a new reward description
// Auth OK: router.post("/", async function (req, res) {
router.post("/", passport.authenticate("jwt", {session: false}), async function (req, res) {
  const { description, value, userId } = req.body

  try {
    const data = await rewardDescriptionController
      .create({
        description: description,
        value: value,
        userId: userId
      });
    res.json(data);
  } catch (err) {
    res.status(503).json(err);
  }
});

// Matches with "/api/reward-descriptions/:id"
// get one reward description by id
// Auth OK: router.get("/:id", async function (req, res) {
  router.get("/:id", passport.authenticate("jwt", {session: false}), async function (req, res) {
  const id = req.params.id;
  try {
    const data = await rewardDescriptionController.findById(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// Matches with "/api/reward-descriptions/user/:id"
// get all rewards by userId
// harry: 5fade384d5d3ef0279022322
// Auth OK: router.get("/user/:id", async function (req, res) {
router.get("/user/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const id = req.params.id;
  try {
    const data = await rewardDescriptionController.findByUserId(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// not sure if we need this
// update a reward descriptionby id
// in req.body, can pass in updated description or value
// Use this to "delete" as well - pass in {isDeleted: true}
// Auth OK: router.put("/:id", async function (req, res)
router.put("/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const id = req.params.id;
  try {
    const data = await rewardDescriptionController.update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;