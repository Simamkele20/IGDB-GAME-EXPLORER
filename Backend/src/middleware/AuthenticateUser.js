import { config } from "dotenv";
import fetch from "node-fetch";

config();

class Auth {
  constructor() {
    this.clientId = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
    this.twitchTokenUrl = `https://id.twitch.tv/oauth2/token`;
  }

  async getTwitchAccessToken() {
    const url = `${this.twitchTokenUrl}?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`;

    try {
      const response = await fetch(url, { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to fetch access token from Twitch");
      }
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      throw new Error(`Error fetching token: ${error.message}`);
    }
  }

  async authenticateUser(req, res) {
    try {
      const twitchAccessToken = await this.getTwitchAccessToken();
      res.json({
        status: res.statusCode,
        token: twitchAccessToken,
        msg: "Authentication successful.",
      });
    } catch (error) {
      res.status(500).json({
        status: res.statusCode,
        msg: `Error during authentication: ${error.message}`,
      });
    }
  }
}
const auth = new Auth();
export { auth };
