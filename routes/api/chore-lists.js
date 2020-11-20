const express = require("express");
const router = express.Router();
const choreListController = require("../../controllers/chore-list-controller");
const passport = require("passport");
ObjectId = require("mongodb").ObjectID;

// for authenticating routes
//require("../../config/passport")(passport);
//const jwt = require("jsonwebtoken");
// const AuthGuard = (req, res, next) => {
//   if (req.user) return false;
//   next();
// }

// Use PASSPORT to authenticate

// Matches with "/api/chore-lists"
// get all household-members
//add authentication with:
// router.get("/", passport.authenticate("jwt", {session: false}),
router.get("/",
  async function(req, res) {
    try {
      const data = await choreListController.findAll();
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

router.get("/user/:id",
  async function(req, res) {
    const id = req.params.id;
    try {
      const data = await choreListController.findByUserId(id);
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

// To create a new chore-list
// completion status is not included here - by default it's false
router.post("/", async function(req, res) {
  const { date, userId, completedBy, tasks, reward } = req.body
  //may have to do something with tasks here first
  //create array with the correct structure (array of _ids)
  // tasks - an array of objects each a task _id and completion status(false by default)
  try {
    const data = await choreListController.create({
      date: date,
      userId: userId,
      completedBy: completedBy,
      tasks: tasks,
      reward: reward,
    });
    res.json(data);
  } catch (err) {
    res.status(503).json(err);
  }
});

// Matches with "/api/chore-lists/:id"
// get one chore list by id
router.get("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await choreListController.findById(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// update a chore list by id
// in req.body, can pass in updated date, completedBy (ref to household-member), tasks, reward, completionStatus
// Use this to "delete" as well - pass in {isDeleted: true}
router.put("/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await choreListController.update({ _id: id }, req.body);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// Matches with "/api/chore-lists/tasks/:id"
// to add tasks to the array
// req should have { task: taskID, completionStatus: false }
router.put("/tasks/:id", async function(req, res) {
  const id = req.params.id;
  console.log("req body:", req.body);
  try {
    const data = await choreListController.addTask(
      {_id: id},
      { $push: {
        tasks: [
          {task: ObjectId(req.body.task), completionStatus: false }
        ]
      }}
    );
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;