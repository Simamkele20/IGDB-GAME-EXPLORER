import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GAMES_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gamesUrl = GAMES_URL;

  constructor(private http: HttpClient) { }

  fetchGames(): Observable<any> {
    return this.http.get<any>(this.gamesUrl); // Make sure the URL is correct
  }
}
