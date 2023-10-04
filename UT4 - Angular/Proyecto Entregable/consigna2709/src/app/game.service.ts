import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Game, Result } from './game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gamesUrl = "https://api.rawg.io/api/games"
  private apiKey = "?key=af4aef52a9a747419ed176bb86304ee1"
  private searchTerm = "&search="
  private searchSize = "&page_size=3"

  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'application/json'
    })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) { }

  getGames(): Observable<Game> {
    return this.http.get<Game>(this.gamesUrl + this.apiKey, this.httpOptions)
      .pipe(tap(_ => this.log('fetched games')), catchError(this.handleError<Game>('getGames')));
  }

  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(this.gamesUrl + "/" + id + this.apiKey, this.httpOptions)
      .pipe(tap(_ => this.log('fetched game')), catchError(this.handleError<Game>('getGame')));
  }

  private log(message: string) {
    this.messageService.add(`GameService: ${message}`);
  }

  searchGames(term: string): Observable<Result[]> {
    if (!term.trim()) {
      return of()
    }
    return this.http.get<Result[]>(this.gamesUrl + this.apiKey + this.searchTerm + term + this.searchSize).pipe(
      map((o: any) => o.results),
      catchError(this.handleError<Result[]>('searchHeroes', []))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
*
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
