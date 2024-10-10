import { AuthenticateUser } from "../middleware/AuthenticateUser.js";

class Games {
  constructor() {
    this.apiUrl = process.env.Games_URL;
    this.myHeaders = new Headers();
    this.myHeaders.append("Accept", "application/json");
    this.myHeaders.append("Client-ID", process.env.CLIENT_ID);
    this.myHeaders.append("Content-Type", "text/plain");
  }

  async initialize() {
    const authUser = new AuthenticateUser(); 
    const token = await authUser.getAccessToken(); 
    this.myHeaders.append("Authorization", `Bearer ${token}`); 
  }

  //  fetch games
  async fetchGames(req, res) {
    const raw =
      "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;";

    const requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(this.apiUrl, requestOptions);
      const result = await response.json();
      res.json({
        status: res.statusCode,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching games:", error);
      res.status(500).json({
        status: 500,
        msg: "An error occurred while fetching games. Please try again later.",
      });
    }
  }

//  fetch a single game by ID
  async fetchGame(req, res) {
    const gameId = req.params.id; 
    const raw = `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where id = ${gameId};`;

    const requestOptions = {
      method: "POST",
      headers: this.myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(this.apiUrl, requestOptions);
      const result = await response.json();
      res.json({
        status: res.statusCode,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching game:", error);
      res.status(500).json({
        status: 500,
        msg: "An error occurred while fetching the game. Please try again later.",
      });
    }
  }
}

export { Games };
