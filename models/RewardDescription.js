const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rewardDescriptionSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  value: {
    type: String
  },
});

module.exports = RewardDescription = mongoose.model("RewardDescription", rewardDescriptionSchema);