import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { ChangeDetectorRef } from '@angular/core';
import { GameByIdResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
Router
import { HeaderComponent } from '../../partials/header/header.component';
import { FormControl } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  game: Game | null = null;
  loading: boolean = true;
  userRating: number = 0;
  searchTermCtrl = new FormControl('');

  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
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
              if (this.game) {
                this.userRating = this.game.rating ?? 0; // Use nullish coalescing operator
              }}
              this.loading = false;
            },
            
        (error) => {
          console.error('Error fetching game:', error);
          this.game = null;
        }
      );
    }
  }

  goBack(): void {
    this.router.navigate(['/home']); // Navigate to home
  }

}