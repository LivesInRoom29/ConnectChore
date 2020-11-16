const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  frequency: {
    type: Number,
    default: 1,
  },
  choreList: {
    type: Schema.Types.ObjectId,
    ref: "ChoreList"
  },
  completedBy: {
    type: Schema.Types.ObjectId,
    ref: "HouseholdMem"
  },
  completedOn: {
    type: Date,
  }
});

module.exports = Task = mongoose.model("Task", taskSchema);