import { Injectable } from '@angular/core';
import { Producto } from './producto';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  productosUrl = "http://localhost:3000/productos";

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl);
  }
  getProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(this.productosUrl+"/"+id);
  }
}
