const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HouseholdMemberSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
module.exports = HouseholdMember = mongoose.model("HouseholdMember", HouseholdMemberSchema);