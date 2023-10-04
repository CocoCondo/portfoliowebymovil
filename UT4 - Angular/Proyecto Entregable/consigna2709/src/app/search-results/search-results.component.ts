import { Component, Input } from '@angular/core';
import { GameSearchComponent } from '../game-search/game-search.component';
import { Result } from '../game';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  @Input() searchResults?: any;
  selectedGame: any;

  setGame(game: Result) {
    this.selectedGame = game;
  }
}