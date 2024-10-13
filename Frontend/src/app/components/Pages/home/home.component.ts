import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { GameResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent],
})
export class HomeComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  filteredGames: Game[] = [];
  private queryParamsSubscription: Subscription | undefined;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.fetchGames().subscribe((response: GameResponse) => {
      this.games = response.data[0].result; // Set all games
      this.filteredGames = this.games;
    });
  }
  onSearchTermChange(searchTerm: string): void {
    this.filteredGames = this._filterGames(searchTerm);
  }

  private _filterGames(value: string): Game[] {
    const filterValue = value.toLowerCase();
    return this.games.filter((game) =>
      game.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
