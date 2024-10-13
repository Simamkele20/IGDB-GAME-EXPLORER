import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { GameResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../partials/header/header.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

export interface ReleaseDate {
  id: number;
  human: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    HeaderComponent,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  filteredGames: Game[] = [];
  selectedGenres: string[] = [];
  selectedPlatforms: string[] = [];
  selectedReleaseYears: string[] = [];
  uniqueGenres: string[] = [];
  uniquePlatforms: string[] = [];
  uniqueReleaseYears: string[] = [];
  private queryParamsSubscription: Subscription | undefined;

  searchTermCtrl = new FormControl('');

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.loadGames();
    this.setupSearch();
  }

  loadGames(): void {
    this.gameService.fetchGames().subscribe((response: GameResponse) => {
      this.games = response.data[0].result;
      this.filteredGames = this.games;
      this.extractUniqueGenres();
      this.extractUniquePlatforms();
      this.extractUniqueReleaseYears();
    });
  }
  getGenres(game: Game): string {
    return game.genres
      ? game.genres.map((genre) => genre.name).join(', ')
      : 'No genres available';
  }

  extractUniqueGenres(): void {
    const genresSet = new Set<string>();
    this.games.forEach((game) => {
      game.genres?.forEach((genre: { name: string }) => {
        genresSet.add(genre.name);
      });
    });
    this.uniqueGenres = Array.from(genresSet);
  }
  getPlatforms(game: Game): string {
    return game.platforms
      ? game.platforms.map((platform) => platform.name).join(', ')
      : 'No platforms available';
  }
  extractUniquePlatforms(): void {
    const platformsSet = new Set<string>();
    this.games.forEach((game) => {
      game.platforms?.forEach((platform: { name: string }) => {
        platformsSet.add(platform.name);
      });
    });
    this.uniquePlatforms = Array.from(platformsSet);
  }

  extractUniqueReleaseYears(): void {
    const releaseYearsSet = new Set<string>();
    this.games.forEach((game) => {
      game.release_dates?.forEach((release: ReleaseDate) => {
        const year = new Date(release.human).getFullYear();
        releaseYearsSet.add(year.toString());
      });
    });
    this.uniqueReleaseYears = Array.from(releaseYearsSet);
  }

  setupSearch(): void {
    this.searchTermCtrl.valueChanges.subscribe((searchTerm) => {
      this.filterGames(searchTerm || '');
    });
  }

  private filterGames(searchTerm: string): void {
    this.filteredGames = this.games.filter((game) => {
      const matchesGenre =
        this.selectedGenres.length === 0 ||
        game.genres?.some((genre) => this.selectedGenres.includes(genre.name));
      const matchesPlatform =
        this.selectedPlatforms.length === 0 ||
        game.platforms?.some((platform) =>
          this.selectedPlatforms.includes(platform.name)
        );
      const matchesYear =
        this.selectedReleaseYears.length === 0 ||
        game.release_dates?.some((release) =>
          this.selectedReleaseYears.includes(
            new Date(release.human).getFullYear().toString()
          )
        );
      const matchesSearchTerm = game.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return (
        matchesGenre && matchesPlatform && matchesYear && matchesSearchTerm
      );
    });
  }

  toggleGenre(genre: string): void {
    const index = this.selectedGenres.indexOf(genre);
    if (index >= 0) {
      this.selectedGenres.splice(index, 1);
    } else {
      this.selectedGenres.push(genre);
    }
    this.filterGames(this.searchTermCtrl.value || '');
  }

  togglePlatform(platform: string): void {
    const index = this.selectedPlatforms.indexOf(platform);
    if (index >= 0) {
      this.selectedPlatforms.splice(index, 1);
    } else {
      this.selectedPlatforms.push(platform);
    }
    this.filterGames(this.searchTermCtrl.value || '');
  }

  onSearchTermChange(searchTerm: string): void {
    this.filterGames(searchTerm || '');
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
