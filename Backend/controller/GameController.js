import express from "express";
import { games } from "../model/index.js";

const gameRouter = express.Router();
await games.initialize();

// Fetch Games
gameRouter.get("/", (req, res) => {
  try {
    games.fetchGames(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve games.",
    });
  }
});

//fetch  game
gameRouter.get("/:id", (req, res) => {
  try {
    games.fetchGame(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a game",
    });
  }
});

export { gameRouter, express };
