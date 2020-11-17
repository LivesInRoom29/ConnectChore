const db = require("../models");

module.exports = {
  findAll: function() {
    return db.RewardDescription.find();
  },
  findById: function(id) {
    return db.RewardDescription.findById(id);
  },
  create: function(body) {
    return db.RewardDescription.create(body);
  },
  update: function(id, body) {
    return db.RewardDescription.findOneAndUpdate(id, body);
  }
}