import express from  "express";
import { games} from "../src/model/index.js";

const gameRouter = express.Router();

// Fetch Games
gameRouter.post("/"), (req, res) => {
    try {
      games.fetchGames(req, res);
    } catch (e) {
      res.json({
        status: res.statusCode,
        msg: "failed to retrieve games.",
      });
    }
  };
  //fetch  game
  gameRouter.post("/:id",  (req, res) => {
    try {
      games.fetchGame(req, res);
    } catch (e) {
      res.json({
        status: res.statusCode,
        msg: "failed to retrieve a game",
      });
    }
  });


  export { gameRouter, express};