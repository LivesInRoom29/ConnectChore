const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const choreListSchema = new Schema({

  date: {
    type: Date,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  completedBy: {
    type: Schema.Types.ObjectId,
    ref: "HouseholdMember"
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
  completionStatus: {
    type: Boolean,
    default: false
  },
  reward: {
    type: Schema.Types.ObjectId,
    ref: "RewardDescription"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = ChoreList = mongoose.model("ChoreList", choreListSchema);