const db = require("../models");

// create is not included in this controller, as that is handled through the authentication process.

module.exports = {
  findAll: function() {
    return db.User.find();
  },
  findById: function(id) {
    return db.User.findById(id);
  },
  update: function(id, body) {
    return db.User.findOneAndUpdate(id, body);
  }
  // getHouseholdMembers: function(id) {
  //   return (
  //     db.User.findById(id).populate("householdMembers")
  //       .exec(function(err, foundUser) {
  //         send(foundUser);
  //       })
  //   )
  // }
}