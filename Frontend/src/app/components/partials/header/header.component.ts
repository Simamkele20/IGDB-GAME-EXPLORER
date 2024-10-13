import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() games: any[] = []; // Accepting games as an input property
  searchTermCtrl = new FormControl('');
  filteredGames$?: Observable<any[]>;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.setupAutocomplete();
  }

  setupAutocomplete(): void {
    this.filteredGames$ = this.searchTermCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGames(value ?? '')) // Use nullish coalescing operator
    );
  }
  private _filterGames(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.games.filter(game => game.name.toLowerCase().includes(filterValue)); // Now accessible
  }

  searchGame(): void {
    const searchTerm = this.searchTermCtrl.value;
    if (searchTerm) {
      this.route.navigate(['/search'], { queryParams: { searchTerm: searchTerm } });
    } else {
      console.log('Search term is empty');
    }
  }
}
