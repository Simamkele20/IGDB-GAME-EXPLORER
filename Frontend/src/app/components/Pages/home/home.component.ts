import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  games: any; // Define the type of games as necessary

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.fetchGames().subscribe(
      (data) => {
        this.games = data; 
      },
      (error) => {
        console.error('Error fetching games:', error); 
      }
    );
  }
}
