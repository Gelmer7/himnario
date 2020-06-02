import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubCategoria, Himno, HimnosService } from 'src/app/services/himnos.service';

@Component({
  selector: 'app-buscar-categoria',
  templateUrl: './buscar-categoria.component.html',
  styles: [
  ]
})
export class BuscarCategoriaComponent implements OnInit {
  
  subCategoria:any  //recibe id de la subCategoria, con el titulo de la Categoria
  resulPronto=false
  himnos:any []=[]

  constructor(  private router:Router,
                private himnosService:HimnosService) {

    if (this.router.getCurrentNavigation().extras.replaceUrl) {
      this.subCategoria = JSON.parse(localStorage.getItem("subCategoria"))
      this.mostrarHimnos()
    } else{
      this.subCategoria = this.router.getCurrentNavigation().extras
      console.log(this.subCategoria);
      this.guardarStorage()
      this.mostrarHimnos()
    }
   }

  ngOnInit(): void {
  }

  guardarStorage(){
    localStorage.setItem("subCategoria",JSON.stringify(this.subCategoria))
  }
  mostrarHimnos(){
    console.log("entro en mostrar...");
    this.himnosService.getHimnosCategoria(this.subCategoria.idsub)
    .subscribe( himns =>{
      this.himnos = himns
    })
  }
  verHimno(himno:any){
    this.router.navigate(['/himno'],himno)
  }
}
