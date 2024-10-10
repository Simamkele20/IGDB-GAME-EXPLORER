import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  games: any[] = []; // Initialize the games array

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames(); // Fetch games when the component initializes
  }

  loadGames(): void {
    this.gameService.fetchGames().subscribe({
      next: (data) => {
        this.games = data.data; // Ensure you're accessing the correct structure of the response
        console.log('Games:', this.games); // Log the fetched games
      },
      error: (error) => {
        console.error('Error fetching games:', error);
      }
    });
  }
}
