const express = require("express");
const router = express.Router();
const hmController = require("../../controllers/household-members-controller");
const userController = require("../../controllers/user-controller");
const passport = require("passport");
// for authenticating routes
//require("../../config/passport")(passport);
//const jwt = require("jsonwebtoken");
// const AuthGuard = (req, res, next) => {
//   if (req.user) return false;
//   next();
// }

// Use PASSPORT to authenticate

// Matches with "/api/household-members"
// get all household-members
//add authentication with:
// router.get("/", passport.authenticate("jwt", {session: false}),
router.get("/",
  async function(req, res) {
    try {
      const data = await hmController.findAll();
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

// To create a new household-member
router.post("/", async function(req, res) {
  const { name, userId } = req.body
  try {
    const data = await hmController.create({
      name: name,
      userId: userId
    });
    // adds the _id of the new member to the array in User
    const addHMtoUser = await userController.update(
      { _id: userId },
      { $push: {householdMembers : data._id}}
    )
    res.status(200).send(data);
  } catch (err) {
    res.status(503).json(err);
  }
});

// Matches with "/api/household-members/:id"
// get one household-member by id
router.get("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await hmController.findById(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// Matches with "/api/household-members/user/:id"
// get all household members by userId
router.get("/user/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await hmController
  .findByUserId(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// update a household member (by id)
router.put("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await hmController.update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;