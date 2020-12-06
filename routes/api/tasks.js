const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/task-controller");
const passport = require("passport");

// Matches with "/api/tasks"
// get all tasks
// Auth OK: router.get("/",
router.get("/", passport.authenticate("jwt", {session: false}),
  async function(req, res) {
    try {
      const data = await taskController.findAll();
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

// get all tasks by userId = /api/tasks
// Auth OK: router.get("/user/:id", async function(req, res) {
router.get("/user/:id", passport.authenticate("jwt", { session: false }), async function(req, res) {
  const id = req.params.id;
  try {
    const data = await taskController
  .findByUserId(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// To create a new task
// completion status is not included here - by default it's false
// Auth OK: router.post("/", async function(req, res) {
router.post("/", passport.authenticate("jwt", { session: false }), async function(req, res) {
  const { description, frequency, userId } = req.body;

  try {
    const data = await taskController.create({
      // name: name,
      description: description,
      frequency: frequency,
      userId: userId
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
// Auth OK: router.get("/:id", async function(req, res) {
router.get("/:id", passport.authenticate("jwt", { session: false }), async function(req, res) {
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
// Auth OK: router.put("/:id", async function(req, res) {
router.put("/:id", passport.authenticate("jwt", { session: false }), async function(req, res) {
  const id = req.params.id;
  try {
    const data = await taskController.update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;