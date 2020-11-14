const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HouseholdMemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = HouseholdMem = mongoose.model("HouseholdMem", HouseholdMemSchema);