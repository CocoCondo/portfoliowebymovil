import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductoComponent } from './producto/producto.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';

const routes: Routes = [
  { path: 'productos', component: ProductoComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'detalles/:id', component: ProductoDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
