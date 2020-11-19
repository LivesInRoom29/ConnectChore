const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/task-controller");
const passport = require("passport");
// for authenticating routes
//require("../../config/passport")(passport);
//const jwt = require("jsonwebtoken");

// Use PASSPORT to authenticate

// Matches with "/api/tasks"
// get all tasks
//add authentication with:
// router.get("/", passport.authenticate("jwt", {session: false}),
router.get("/",
  async function(req, res) {
    try {
      const data = await taskController.findAll();
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

// To create a new task
// maybe instead, have the task be created when the chore-list is?
// completion status is not included here - by default it's false
// maybe have completion status too? then updated the completedOn when that is updated?
router.post("/", async function(req, res) {
  const { description, frequency } = req.body;

  try {
    const data = await taskController.create({
      // name: name,
      description: description,
      frequency: frequency,
      //choreList: choreList,
      //completedBy: completedBy,
      //completedOn: completedOn
    });
    res.json(data);
  } catch (err) {
    res.status(503).json(err);
  }
});

// Matches with "/api/tasks/:id"
// get one task by id
router.get("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await taskController.findById(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// update a task by id
// in req.body, can pass in updated description or frequency
// Use this to "delete" as well - pass in {isDeleted: true}
router.put("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await taskController.update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;