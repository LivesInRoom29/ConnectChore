const db = require("../models");

module.exports = {
  findAll: function() {
    return db.ChoreList.find();
  },
  findById: function(id) {
    return db.ChoreList.findById(id);
  },
  create: function(body) {
    return db.ChoreList.create(body);
  },
  update: function(id, body) {
    return db.ChoreList.findOneAndUpdate(id, body);
  },
  addTask: function(id, taskId) {
    return db.ChoreList.findOneAndUpdate(id, taskId);
  }
}