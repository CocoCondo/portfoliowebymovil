import { Component, Input, OnInit} from '@angular/core';

import { Producto } from '../producto';
import { ProductosService } from '../productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{

  constructor(private productosService: ProductosService) {}

  productos: Producto[] = [];

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void{
    this.productosService.getProductos().subscribe(productos => this.productos = productos);
  }
}