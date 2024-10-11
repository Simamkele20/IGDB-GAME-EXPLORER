export interface Game {
  id: number;
  name: string;
  age_ratings?: Array<any>;
  aggregated_rating?: number;
  aggregated_rating_count?: number;
  alternative_names?: Array<string>;
  category?: number;
  cover?: number;
  created_at?: number;
}

export interface GameResponse {
  status: number;
  data: Game[];
}
