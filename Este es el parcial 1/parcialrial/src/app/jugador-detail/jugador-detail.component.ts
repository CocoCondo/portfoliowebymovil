import { Component, OnInit, Input } from '@angular/core';
import { Jugador } from '../jugador';
import { JugadoresService } from '../jugadores.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-jugador-detail',
  templateUrl: './jugador-detail.component.html',
  styleUrls: ['./jugador-detail.component.css']
})
export class JugadorDetailComponent implements OnInit {

  @Input() jugador?: Jugador;

  constructor(
    private jugadoresService: JugadoresService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getJugador();
  }

  getJugador(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.jugadoresService.getJugador(id).subscribe(jugador => this.jugador = jugador);
  }

  goBack(): void {
    this.location.back();
  }

  delete(jugador: Jugador): void {
    this.jugadoresService.deleteJugador(jugador.id)
    .subscribe(() => this.goBack());
  }

  save(): void {
    if (this.jugador) {
      this.jugadoresService.updateJugador(this.jugador)
        .subscribe(() => this.goBack());
    }
  }
}
