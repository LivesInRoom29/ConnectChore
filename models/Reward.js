const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardSchema = new Schema({
  rewardDescription: {
    type: Schema.Types.ObjectId,
    ref: "RewardDescription"
  },
  householdMem: {
    type: Schema.Types.ObjectId,
    ref: "HouseholdMem"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
});

module.exports = Reward = mongoose.model("Reward", rewardSchema);