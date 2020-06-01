import { Component, OnInit } from '@angular/core';
import { HimnosService, Himno, Categoria } from 'src/app/services/himnos.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent implements OnInit {
  categorias:Categoria [] = []

  constructor( private himnosService:HimnosService) { 
    this.himnosService.getCategorias()
    .subscribe( (val) => {
      this.categorias = val
      console.log(this.categorias);
    })
  }

  ngOnInit(): void {
  }

}
