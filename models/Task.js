const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true
  // },
  description: {
    type: String,
  },
  frequency: {
    type: Number,
    default: 1,
  },
  // choreList: {
  //   type: Schema.Types.ObjectId,
  //   ref: "ChoreList"
  // },
  // completedBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: "HouseholdMember"
  // },
  completedOn: {
    type: Date,
    // when first created, should be null
    default: null
  },
  isDeleted: {
    type: Boolean,
    deafult: false
  }
});

module.exports = Task = mongoose.model("Task", taskSchema);