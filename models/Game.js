const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    gameId: {
        type: Schema.Types.ObjectId,
        ref: "Game"
    }, 
    winner: {
        type: Schema.Types.ObjectId,
        ref: "Winner"
    },
});

module.exports = Game - mongoose.model("Game", GameSchema);