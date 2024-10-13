import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { ChangeDetectorRef } from '@angular/core';
import { GameByIdResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  game: Game | null = null;
  searchTermCtrl = new FormControl('');

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
        (response: GameByIdResponse) => {
          if (response.data && response.data.length > 0) {
            this.game =
              response.data[0].result.find(
                (game: Game) => game.id === parseInt(gameId, 10)
              ) || null;
          }
        },
        (error) => {
          console.error('Error fetching game:', error);
          this.game = null;
        }
      );
    }
  }

  onSearchTermChange(searchTerm: string): void {}
}
