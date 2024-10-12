import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { ChangeDetectorRef } from '@angular/core';
import { GameByIdResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent {
  game!: Game;
  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadGame();
  }

  loadGame(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.gameService.fetchGameById(gameId).subscribe(
        (response: GameByIdResponse  ) => {
          if (response.data && response.data.length > 0) {
            const gameData = response.data[0].result.find(
              (game: Game) => game.id === parseInt(gameId)
            );
            if (gameData) {
              this.game = gameData;
            }
          }
        },
        (error) => {
          console.error('Error fetching game:', error);
        }
      );
    }
  }
}
