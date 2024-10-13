import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../../shared/models/game';
import { GameResponse } from '../../../shared/models/game';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterOutlet, RouterModule],
})
export class HomeComponent implements OnInit, OnDestroy {
  games: Game[] = [];
  searchTermCtrl = new FormControl(''); // Control for the search input
  filteredGames$?: Observable<Game[]>; // Observable for filtered games
  noResultsFound: boolean = false; // Flag to indicate if no results were found
  private queryParamsSubscription: Subscription | undefined; // Optional Subscription for query params

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadGames(); // Load games when the component initializes
    this.setupSearchFiltering(); // Set up filtering based on search input
  }

  loadGames(): void {
    this.gameService.fetchGames().subscribe((response: GameResponse) => {
      this.games = response.data[0].result; // Set all games
    });
  }

  setupSearchFiltering(): void {
    this.filteredGames$ = this.searchTermCtrl.valueChanges.pipe(
      startWith(''), // Start with an empty string
      map(value => {
        // Check if there is a search term; if so, filter the games; otherwise, return all games
        return value ? this._filterGames(value) : this.games.slice();
      })
    );

    // Subscribe to query params to set the initial search value
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const searchTerm = params['searchTerm'] || ''; // Get search term from query params
      this.searchTermCtrl.setValue(searchTerm); // Set the value in the form control
    });
  }

  private _filterGames(value: string): Game[] {
    const filterValue = value.toLowerCase(); // Normalize the input to lowercase
    return this.games.filter(game => 
      game.name.toLowerCase().includes(filterValue) // Filter games by name
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }
}
