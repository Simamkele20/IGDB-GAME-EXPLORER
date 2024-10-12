import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { ChangeDetectorRef } from '@angular/core';
import { GameResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule  } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterOutlet,RouterModule],
})
export class HomeComponent implements OnInit {
  games: Game[] = [];
  constructor(
    private gameService: GameService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.fetchGames().subscribe(
      (response: GameResponse) => {
        if (response.data.length > 0) {
          this.games = response.data[0].result;
        }
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching games:', error);
      }
    );
  }
}
