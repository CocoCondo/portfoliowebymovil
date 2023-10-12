import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JugadorComponent } from './jugador/jugador.component';
import { JugadorDetailComponent } from './jugador-detail/jugador-detail.component';


const routes: Routes = [
  { path: 'jugadores', component: JugadorComponent },
  { path: '', redirectTo: '/jugadores', pathMatch: 'full' },
  { path: 'detalles/:id', component: JugadorDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
