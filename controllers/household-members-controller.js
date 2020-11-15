const db = require("../models");

module.exports = {
  findAll: function() {
    return db.HouseholdMember.find();
  },
  findById: function(id) {
    return db.HouseholdMember.findById(id);
  },
  create: function(body) {
    return db.HouseholdMember.create(body);
  }
}