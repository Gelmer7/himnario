import { Component, OnInit } from '@angular/core';
import { HimnosService, Himno, Categoria } from 'src/app/services/himnos.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styles: [
  ]
})
export class CategoriasComponent implements OnInit {
  categorias:Categoria [] = []

  constructor(  private himnosService:HimnosService,
                private router:Router) { 
    this.getCategorias()
  }

  ngOnInit(): void {
  }

  getCategorias(){
    this.himnosService.getCategorias()
    .subscribe( (val) => {
      this.categorias = val
    })
  }
  verSubCategoria(idsub:string, catTitulo:string, subTitulo:string){
    let buscaCategoria:Object = {
      idsub:idsub,
      catTitulo:catTitulo,
      subTitulo:subTitulo
    }
    this.router.navigate(['/buscacategoria'],buscaCategoria)
  }

}
