import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Jugador } from './jugador';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  jugadoresUrl = "http://localhost:3000/jugadores";

  getJugadores(): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(this.jugadoresUrl)
      .pipe(tap(_ => this.log('Jugadores obtenidos satisfactoriamente')), catchError(this.handleError<Jugador[]>('getJugadores')));
  }
  getJugador(id: number): Observable<Jugador> {
    return this.http.get<Jugador>(this.jugadoresUrl + "/" + id)
      .pipe(tap(_ => this.log("Jugador obtenido")), catchError(this.handleError<Jugador>('getJugador')));
  }

  private log(message: string) {
    this.messageService.add(`JugadoresService: ${message}`);
  }

  /** DELETE: */
  deleteJugador(id: number): Observable<Jugador> {
    const url = `${this.jugadoresUrl}/${id}`;

    return this.http.delete<Jugador>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Jugador borrado id=${id}`)),
      catchError(this.handleError<Jugador>('deleteJugador'))
    );
  }

  /** PUT: */
  updateJugador(jugador: Jugador): Observable<any> {
    return this.http.put(this.jugadoresUrl+"/"+jugador.id, jugador, this.httpOptions).pipe(
      tap(_ => this.log(`Modificado jugador id=${jugador.id}`)),
      catchError(this.handleError<any>('updateJugador'))
    );
  }

  addJugador(jugador: Jugador): Observable<Jugador> {
    return this.http.post<Jugador>(this.jugadoresUrl, jugador, this.httpOptions).pipe(
      tap((newJugador: Jugador) => this.log(`added jugador w/ id=${newJugador.id}`)),
      catchError(this.handleError<Jugador>('addJugador'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} Error: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
