export interface Platform {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  summary: string;
  first_release_date?: number;
  cover?: {
    url: string;
  };
  genres?: { id: number; name: string }[];
  platforms?: Platform[];

}

export interface GameResponse {
  status: number;
  data: {
    name: string;
    result: Game[];
  }[];
}
