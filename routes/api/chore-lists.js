const express = require("express");
const router = express.Router();
const choreListController = require("../../controllers/chore-list-controller");
const passport = require("passport");
const { format } = require("date-fns");
ObjectId = require("mongodb").ObjectID;

// Matches with "/api/chore-lists"
// get all chore-lists
// Auth OK: router.get("/",
router.get("/", passport.authenticate("jwt", { session: false }),
  async function (req, res) {
      try {
        const data = await choreListController.findAll();
        res.json(data);
      } catch (err) {
        res.status(503).json(err);
      }
  }
);

// Auth OK: router.get("/user/:id", async function (req, res) {
router.get("/user/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const id = req.params.id;

  try {
      const data = await choreListController.findByUserId(id);
        //res.json(data);
        res.send(data);
    } catch (err) {
      res.status(503).json(err);
    }
  });

// To create a new chore-list
// completion status is not included here - by default it's false
// Auth OK: router.post("/", async function (req, res) {
router.post("/", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const { date, userId, completedBy, tasks, reward } = req.body
  // may have to do something with tasks here first
  // create array with the correct structure (array of _ids)
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
// Auth OK: router.get("/:id", async function (req, res) {
router.get("/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const id = req.params.id;

  try {
    const data = await choreListController.findById(id);
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// Get the chorelist for a specific household member and date
// the date can be passed in with format "MM/dd/yyyy"
// Auth OK: router.get("/householdmember/:id", async function (req, res) {
router.get("/householdmember/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const householdMemberId = req.params.id;
  const cldate = format(new Date(req.body.date),"MM/dd/yyyy");

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
// Auth OK:
router.get("/withtasks/:id", async function (req, res) {
//router.get("/withtasks/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
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
// Auth OK: router.put("/:id", async function (req, res) {
router.put("/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
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
// Auth OK: router.put("/tasks/:id", async function (req, res) {
router.put("/tasks/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const id = req.params.id;

  try {
    const data = await choreListController.addTask(
      { _id: id },
      {
        $push: {
          tasks: [
            { task: req.body.task, completionStatus: false }
          ]
        }
      }
    );
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// To update a task in a chorelist to show it's been completed
// matches with /api/chore-lists/completetask
// in req.body need to pass in {completionStatus: ----} with true or false
// Auth OK: router.put("/completetask/:taskId", async function (req, res) {
router.put("/completetask/:taskId", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const taskId = req.params.taskId;
  const completionStatus = req.body.completionStatus;

  try {
    const data = await choreListController.updateTaskCompletionStatus(
      { "tasks._id": ObjectId(taskId) },
      { $set: { "tasks.$.completionStatus": completionStatus } }
    );
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

// to delete a task just from the chorelist
// use $pull
// in req.body need to pass in {taskId: ----} with id#
// Auth OK: router.put("/deletetask/:id", async function (req, res) {
router.put("/deletetask/:id", passport.authenticate("jwt", { session: false }), async function (req, res) {
  const chorelistId = req.params.id;
  const taskId = req.body.taskId;

  try {
    const data = await choreListController.removeTask(
      { _id: ObjectId(chorelistId) },
      { $pull: { tasks: { _id: ObjectId(taskId) } } }
    );
    res.send(data);
  } catch (err) {
    res.status(503).end(err);
  }
});

module.exports = router;