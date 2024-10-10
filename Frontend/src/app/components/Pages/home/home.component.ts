import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Game } from '../../../shared/models/game';
import { GameService } from '././../../../services/game.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  games: Game[] = [];

  constructor(
    private gameService: GameService,
    activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {});
    this.games = GameService.fetchGames();
    let GamessObservable: Observable<Game[]>;
  }

  ngOnInit(): void {}
}
