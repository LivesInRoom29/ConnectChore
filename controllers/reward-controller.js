const db = require("../models");

module.exports = {
  findAll: function() {
    return db.Reward.find();
  },
  findById: function(id) {
    return db.Reward.findById(id);
  },
  create: function(body) {
    return db.Reward.create(body);
  },
  update: function(id, body) {
    return db.Reward.findOneAndUpdate(id, body);
  }
}