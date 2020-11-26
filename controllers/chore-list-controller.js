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
    return db.ChoreList.findOneAndUpdate(id, taskId, { new: true });
  },
  findByUserId: function(userId) {
    return db.ChoreList.find({userId: userId});
  },
  findByHouseholdMemberAndDate: function(householdMemberId, date) {
    return db.ChoreList.find({completedBy: householdMemberId, date: date});
  },
  updateTaskCompletionStatus: function(taskId, completionStatus) {
    return db.ChoreList.findOneAndUpdate(taskId, completionStatus, { new: true });
  }
}