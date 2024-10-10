import { AuthenticateUser } from "../middleware/AuthenticateUser.js";

class Search {
  constructor() {
    this.apiUrl = +process.env.Search_URL;
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
  async fetchSearchGames(req, res) {
    const raw =
      "fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;";

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
      console.error("Error fetching Search games:", error);
      res.status(500).json({
        status: 500,
        msg: "An error occurred while fetching Search games. Please try again later.",
      });
    }
  }

  //  fetch a single game by ID
  async fetchSearchGame(req, res) {
    const gameName = req.params.name;
    const raw = `fields alternative_name,character,checksum,collection,company,description,game,name,platform,published_at,test_dummy,theme;where name = "${gameName}";`;

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

export { Search };
