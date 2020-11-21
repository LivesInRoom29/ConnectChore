const db = require("../models");

module.exports = {
  findAll: function() {
    return db.HouseholdMember.find();
  },
  findByUserId: function(userid) {
    return db.HouseholdMember.find({userId: userid})
  },
  findById: function(id) {
    return db.HouseholdMember.findById(id);
  },
  create: function(body) {
    return db.HouseholdMember.create(body);
  },
  update: function(id, body) {
    return db.HouseholdMember.findOneAndUpdate(id, body);
  }
}