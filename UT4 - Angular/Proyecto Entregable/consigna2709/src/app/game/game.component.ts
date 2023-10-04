import { Component, OnInit } from '@angular/core';
import { Game, Result } from '../game';
import { GameService } from '../game.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  games: Result[] = [];
  selectedGame: any;

  constructor(private gameService: GameService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.getGames();
  }

  setGame(game: Result) {
    console.log("Este es el juego:",game);
    this.selectedGame = game;
  }

  getGames(): void{
    this.gameService.getGames()
    .subscribe(games => this.games = games.results);
  }
}
