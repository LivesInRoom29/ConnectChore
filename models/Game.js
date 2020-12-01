const mongoose = require("mongoose");
const HouseholdMember = require("./HouseholdMember");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    gameId: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    }, 
    player1: {
        type: Schema.Types.ObjectId,
        ref: "HouseholdMember"
    },
    player2: {
        type: Schema.Types.ObjectId,
        ref: "HouseholdMember"
    },
    winner: {
        type: Schema.Types.ObjectId,
        ref: "Winner"
    },
    // reward: {
    //     type: Schema.Types.ObjectId,
    //     ref: "reward"
    // }
});

module.exports = Game - mongoose.model("Game", GameSchema);