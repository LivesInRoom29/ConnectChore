const express = require("express");
const router = express.Router();
const rewardDescriptionController = require("../../controllers/reward-description-controller");
const passport = require("passport");
// for authenticating routes
//require("../../config/passport")(passport);
//const jwt = require("jsonwebtoken");


// Use PASSPORT to authenticate

// Matches with "/api/reward-descriptions"
// get all reward descriptions
//add authentication with:
// router.get("/", passport.authenticate("jwt", {session: false}),
router.get("/",
  async function(req, res) {
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
router.post("/", async function(req, res) {
  const { description, value, userId } = req.body

  try {
    const data = await rewardDescriptionController
  .create({
      description: description,
      value: value,
      userid: userId
    });
    res.json(data);
  } catch (err) {
    res.status(503).json(err);
  }
});

// Matches with "/api/reward-descriptions/:id"
// get one reward description by id
router.get("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await rewardDescriptionController
  .findById(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// not sure if we need this
// update a reward descriptionby id
// in req.body, can pass in updated description or value
// Use this to "delete" as well - pass in {isDeleted: true}
router.put("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await rewardDescriptionController
  .update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;