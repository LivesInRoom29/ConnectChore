const mongoose = require("mongoose");
ObjectId = require("mongodb").ObjectID;
const db = require("../models");


// This file empties all collection and inserts the documents below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/connectChore"
);

//create the user with authentification
//**UPDATE THIS with a user you have on your local machine** */
const userID = ObjectId("5fb03b9527ae29af605a190a");

const householdMemberSeed = [
  {
    name: "HM1",
    userId: userID
  },
  {
    name: "HM2",
    userId: userID
  }
];

const rewardDescriptionSeed = [
  {
    description: "reward1",
    value: 10,
    userId: userID
  },
  {
    description: "reward2",
    value: 20,
    userId: userID
  },
  {
    description: "reward3",
    value: 5,
    userId: userID
  }
];

const seedReward = (hmId, rdId) => {
  db.Reward
    .remove({})
    .then(() => db.Reward.collection.insertOne(
      {
        rewardDescriptionId: ObjectId(rdId),
        householdMemberId: ObjectId(hmId),
        userId: userID
      }
    ))
    .then(data => {
      return data.ops[0]._id;
    })
}

const addTaskToChorelist = (choreListID, taskId) => {
  db.ChoreList.collection.findOneAndUpdate({ _id: choreListID }, { $push: {tasks : {task: ObjectId(taskId), completionStatus: false }}}, {new: true})
    .then(data => {
      console.log(`Task ID ${taskId} added to ChoreList ${choreListID}`);
    })
    .catch(err => {
      console.log(err);
    })
}

const seedTask = (description, frequency, clId) => {
  db.Task.collection.insertOne(
    {
      // name: name,
      description: description,
      frequency: frequency,
      // choreList: ObjectId(clId),
      // completedBy: ObjectId(hmId),
      // completedOn: null,
      isDeleted: false
    })
    .then(data => {
      console.log(data.result.n + " task records inserted!");
      const refId = data.ops[0]._id;
      addTaskToChorelist(clId, refId);
      return refId;
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    })
}

// returns a promise so that the tasks aren't created before the chore-list
const seedChoreList = (date, hmId, rewardId) => {
  return new Promise((resolve, reject) => {
    db.ChoreList
    .remove({})
    .then(() => db.ChoreList.collection.insertOne(
      {
        date: date,
        userId: userID,
        completedBy: ObjectId(hmId),
        tasks: [],
        completionStatus: false,
        reward: ObjectId(rewardId)
      }
    ))
    .then(data => {
      console.log(data.result.n + " choreList records inserted!");
      console.log("chorelist created Id:", data.ops[0]._id);
      resolve(data.ops[0]._id);
    })
    .catch(err => {
      console.log("seedChorelist Error", err);
      reject(err);
    })
  });
}

const seedDB = () => {
  let hmId1, hmId2;
  let rdId1, rdId2, rdId3;
  let rewardId1, rewardId2, rewardId3, rewardId4, rewardId5;
  let taskId1, taskId2, taskId3, taskId4, taskId5, taskId6;
  let chorelistId1, chorelistId2;

  db.HouseholdMember.collection.insertMany(householdMemberSeed)
    .then(data => {
      console.log(data.result.n + " HM records inserted!");
      hmId1 = data.ops[0]._id;
      hmId2 = data.ops[1]._id;
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });

  // Remove all documents from RewardDescription collection
  // Add new documents from array above
  // Once that's completed, seed the Rewards and save the ID for those to the 4 variables.
  db.RewardDescription
    .remove({})
    .then(() => db.RewardDescription.collection.insertMany(rewardDescriptionSeed)
    )
    .then(data => {
      console.log(data.result.n + " reward description records inserted!");
      rdId1 = data.ops[0]._id;
      rdId2 = data.ops[1]._id;
      rdId3 = data.ops[2]._id;
    })
    .then(() => {
      rewardId1 = seedReward(hmId1, rdId1);
      rewardId2 = seedReward(hmId1, rdId2);
      rewardId3 = seedReward(hmId1, rdId3);
      rewardId4 = seedReward(hmId2, rdId1);
      rewardId5 = seedReward(hmId2, rdId2);
      // SeedChoreList returns a promise that resolves with the chore-list ID to be used to seed the 3 tasks.
      seedChoreList("2020-12-12", hmId1, rewardId1)
        .then(result => {
          chorelistId1 = result;
          taskId1 = seedTask("laundy: clean, dry, and fold one load", 1, chorelistId1);
          taskId2 = seedTask("dishes: clean, dry, and put away dishes for one meal load", 2, chorelistId1);
          taskId3 = seedTask("clean room: everything should be put away, vacuum", 1, chorelistId1);
        });
      seedChoreList("2020-12-14", hmId2, rewardId4)
        .then(result => {
          chorelistId2 = result;
          taskId4 = seedTask("task1", 1, chorelistId2);
          taskId5 = seedTask("task2", 2, chorelistId2);
          taskId6 = seedTask("task3", 3, chorelistId2);
        })
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

seedDB();