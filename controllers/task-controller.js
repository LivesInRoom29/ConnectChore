const db = require("../models");

module.exports = {
  findAll: function() {
    return db.Task.find();
  },
  findByUserId: function(userId) {
    return db.Task.find({userId: userId});
  },
  findById: function(id) {
    return db.Task.findById(id);
  },
  create: function(body) {
    return db.Task.create(body);
  },
  update: function(id, body) {
    return db.Task.findOneAndUpdate(id, body);
  }
}