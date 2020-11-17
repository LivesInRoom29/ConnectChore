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
    ref: "User"
  },
  isDeleted: {
    type: Boolean,
    deafult: false
  }
});

module.exports = RewardDescription = mongoose.model("RewardDescription", rewardDescriptionSchema);