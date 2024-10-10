import { environment } from "../../../environment/environment";

// src/app/shared/constants/urls.ts

export const GAMES_URL = `${environment.apiUrl}/games`;

export const GAMES_BY_ID_URL = GAMES_URL + '/';
export const SEARCH_URL = `${environment.apiUrl}/search`;
export const SEARCH_BY_NAME_URL = SEARCH_URL + '/';