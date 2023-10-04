import { Component, OnInit } from '@angular/core';
import { Game, Result } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{
  
  games: Result[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.games = games.results.slice(1, 5));
  }
}
