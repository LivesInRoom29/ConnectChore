const db = require("../models");

module.exports = {
    findById: function (id) {
        return db.HouseholdMember.findById(id);
    },
    update: function (winner, body) {
        return db.Game.findOneAndUpdate(winner, body);
    }
}