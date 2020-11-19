const mongoose = require("mongoose");
ObjectId = require("mongodb").ObjectID;
const db = require("../models");
const choreListController = require("../controllers/chore-list-controller");


// This file empties all collection and inserts the documents below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/connectChore"
);

//create the user with authentification
// use user: Roxy1, id: ObjectId("5fb08aef14900580a42f8aca")
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
  db.Reward.collection.insertOne(
    {
      rewardDescriptionId: ObjectId(rdId),
      householdMemberId: ObjectId(hmId),
      userId: userID
    }
  )
  .then(data => {
    return data.ops[0]._id;
  })
}

const seedTask = (name, description, frequency, clId, hmId) => {
  db.Task.collection.insertOne(
    {
      name: name,
      description: description,
      frequency: frequency,
      choreList: ObjectId(clId),
      completedBy: ObjectId(hmId),
      completedOn: null,
      isDeleted: false
    })
    .then(data => {
      console.log(data.result.n + " task records inserted!");
      const refId = data.ops[0]._id;
      choreListController.update({ _id: clId }, { $push: {tasks : ObjectId(refId)}})
      return refId;
    })
    .catch(err => {
      console.log(err);
      process.exit(1);
    })
}

const seedChoreList = (date, hmId, rewardId) => {
  db.ChoreList.collection.insertOne(
    {
      date: date,
      userId: userID,
      completedBy: ObjectId(hmId),
      tasks: [],
      completionStatus: false,
      reward: ObjectId(rewardId)
    }
  )
  .then(data => {
    console.log(data.result.n + " choreList records inserted!");
    console.log("seedChorelist returns", data.ops[0]._id);
    return data.ops[0]._id;
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  })
}

// maybe not for the user?
// db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(bookSeed))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// db.HouseholdMember
//   .remove({})
  // .then(() =>

const seedDB = () => {
  let hmId1, hmId2;
  let rdId1, rdId2, rdId3;
  let rewardId1, rewardId2, rewardId3;
  let taskId1, taskId2, taskId3;
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

  db.RewardDescription.collection.insertMany(rewardDescriptionSeed)
    .then(data => {
      console.log(data.result.n + " reward description records inserted!");
      rdId1 = data.ops[0]._id;
      rdId2 = data.ops[1]._id;
      rdId3 = data.ops[2]._id;
    })
    .then(data => {
      rewardId1 = seedReward(hmId1, rdId1);
      rewardId2 = seedReward(hmId1, rdId2);
      rewardId3 = seedReward(hmId1, rdId3);
      rewardId4 = seedReward(hmId2, rdId1);
      rewardId5 = seedReward(hmId2, rdId2);
      chorelistId1 = seedChoreList("2020-12-12", hmId1, rewardId1);
      chorelistId2 = seedChoreList("2020-12-14", hmId2, rewardId4);
      taskId1 = seedTask("laundry", "clean, dry, and fold one load", 1, chorelistId1, hmId1);
      taskId2 = seedTask("dished", "clean, dry, and put away dishes for one meal load", 2, chorelistId1, hmId1);
      taskId3 = seedTask("clean room", "everything should be put away, vacuum", 1, chorelistId1, hmId1);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

seedDB();
// db.HouseholdMember.collection.insertMany(householdMemberSeed)
//   .then(data => {
//     console.log(data.result.n + " HM records inserted!");
//     console.log (data.ops[0]._id)
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// db.RewardDescription.collection.insertMany(rewardDescriptionSeed)
//   .then(data => {
//     console.log(data.result.n + " reward description records inserted!");
//   })
//   .then(data => {
//     console.log(data)
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });