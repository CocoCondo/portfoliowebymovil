import { Component, OnInit } from '@angular/core';
import { JugadoresService } from '../jugadores.service';
import { Jugador } from '../jugador';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit{

  constructor(private jugadoresService: JugadoresService) {}

  jugadores: Jugador[] = [];

  ngOnInit(): void {
    this.getJugadores();
  }

  getJugadores(): void{
    this.jugadoresService.getJugadores().subscribe(jugadores => this.jugadores = jugadores);
  }

  add(name: string, posicion: string): void {
    name = name.trim();
    if (!name) { return; }
    this.jugadoresService.addJugador({ nombre: name, posicion: posicion } as Jugador)
      .subscribe(jugador => {
        this.jugadores.push(jugador);
      });
  }
}
