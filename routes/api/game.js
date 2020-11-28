const express = require("express");
const router = express.Router();
const gameController = require("../../controllers/game-controller");
ObjectId = require("mongodb").ObjectID;




router.post("/", async function(req, res) {
    const { date, gameId, player1Id, player2Id, winner, reward } = req.body
    try {
      const data = await gameController.create({
        date: date,
        gameId: gameId,
        player1: player1Id,
        player2: player2Id,
        winner: winner,
        reward: reward,
      });
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  });


  router.get("/winner/:id",
  async function(req, res) {
    const winnerId = req.params.winnerId;
    try {
      const data = await choreListController.findById(winnerId);
      res.json(data);
    } catch (err) {
      res.status(503).json(err);
    }
  }
);

