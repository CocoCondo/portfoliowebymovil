import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Producto } from '../producto';
import { ProductosService } from '../productos.service';


@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.css']
})
export class ProductoDetailComponent implements OnInit {

  producto: Producto | undefined;

  constructor(
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getProducto();
  }

  getProducto(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.productosService.getProducto(id).subscribe(producto => this.producto = producto);
  }
  
  goBack(): void {
    this.location.back();
  }
}
