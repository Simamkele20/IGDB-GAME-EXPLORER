import { Injectable } from '@angular/core';
import { Game } from '../shared/models/game';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GAMES_URL } from '../shared/constants/urls';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  static fetchGames(): Game[] {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

  fetchGames(): Observable<Game[]>{
    return this.http.get<Game[]>(GAMES_URL);
  }
}
