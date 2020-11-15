const express = require("express");
const router = express.Router();
const hmController = require("../../controllers/household-members-controller");
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
    res.json(data);
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

// update a household member
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