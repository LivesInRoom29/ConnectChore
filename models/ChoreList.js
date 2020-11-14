const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const choreListSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  completedBy: {
    type: Schema.Types.ObjectId,
    ref: "HouseholdMem"
  },
  tasks: [{
    task: {
      type: Schema.Types.ObjectId,
      ref: "Task"
    },
    completionStatus: {
      type: Boolean,
      default: false
    }
  }],
  date: {
    type: Date,
    required: true
  },
  completionStatus: {
    type: Boolean,
    default: false
  },
  reward: {
    type: Schema.Types.ObjectId,
    ref: "Reward"
  }
});

module.exports = ChoreList = mongoose.model("ChoreList", choreListSchema);