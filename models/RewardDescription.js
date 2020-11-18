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
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = RewardDescription = mongoose.model("RewardDescription", rewardDescriptionSchema);