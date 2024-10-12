import express from "express";
import { search } from "../models/index.js";

const searchRouter = express.Router();
await search.initialize();

// Fetch Search Games
searchRouter.get("/", (req, res) => {
  try {
    search.fetchSearchGames(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve search games.",
    });
  }
});

//fetch  Search game
searchRouter.get("/:name", (req, res) => {
  try {
    search.fetchSearchGame(req, res);
  } catch (e) {
    res.json({
      status: res.statusCode,
      msg: "failed to retrieve a Search game",
    });
  }
});

export { searchRouter, express };
