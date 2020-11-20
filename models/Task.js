const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  description: {
    type: String,
  },
  frequency: {
    type: Number,
    default: 1,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  isDeleted: {
    type: Boolean,
    deafult: false
  }
});

module.exports = Task = mongoose.model("Task", taskSchema);