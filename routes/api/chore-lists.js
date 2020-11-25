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
  // if you don't pass in tasks, it will be an empty array; then you can add tasks later (see route below for adding tasks)
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

// Get the chorelist for a specific household member and date
// the date can be passed in with format "yyyy-mm-dd"
router.get("/householdmember/:id", async function(req, res) {
  const householdMemberId = req.params.id;
  const cldate = new Date(req.body.date);
  try {
    const data = await choreListController.findByHouseholdMemberAndDate(
      householdMemberId,
      cldate
    ).populate("tasks.task");
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// Get chorelist by id populated with tasks
router.get("/withtasks/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await choreListController.findById(id).populate("tasks.task");
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
})

// update a chore list by id
// in req.body, can pass in updated date, completedBy (ref to household-member), tasks, reward, completionStatus
// Use this to "delete" the chorelist as well - pass in {isDeleted: true}
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
// req should have { task: taskID }
router.put("/tasks/:id", async function(req, res) {
  const id = req.params.id;
  try {
    const data = await choreListController.addTask(
      {_id: id},
      { $push: {
        tasks: [
          {task: req.body.task, completionStatus: false }
        ]
      }}
    );
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// To update a task in a chorelist to show it's been completed
//matches with /api/chore-lists/complete-task
//in req.body need to pass in {taskId: ----} with id#
router.put("/completetask", async function(req, res) {
  //const chorelistId = req.params.id;
  console.log("RAN IT");
  console.log("req.body", req.body);
  const taskId = req.body.taskId;
  const completionStatus = req.body.completionStatus;
  console.log("taskID: ", taskId);
  try {
    const data = await choreListController.updateTaskCompletionStatus(
      {"tasks._id": taskId},
      { $set : {"tasks.$.completionStatus" : completionStatus}}
    );
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// to delete a task just from the chorelist
// use $pull



module.exports = router;