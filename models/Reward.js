const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  rewardDescriptionId: {
    type: Schema.Types.ObjectId,
    ref: "RewardDescription"
  },
  householdMemberId: {
    type: Schema.Types.ObjectId,
    ref: "HouseholdMember"
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

module.exports = Reward = mongoose.model("Reward", rewardSchema);