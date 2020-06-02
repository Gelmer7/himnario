import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Himno, HimnosService } from 'src/app/services/himnos.service';

@Component({
  selector: 'app-himno',
  templateUrl: './himno.component.html',
  styles: [
  ]
})
export class HimnoComponent implements OnInit {

  himno:any
  categorias:Object = {}

  constructor(  private router:Router,
                private himnoService:HimnosService) {

    if (this.router.getCurrentNavigation().extras.replaceUrl) {
      this.himno = JSON.parse(localStorage.getItem("himno"))
    } else{
      this.himno = this.router.getCurrentNavigation().extras
      console.log(this.himno);
      this.guardarStorage()
    }
   }

  ngOnInit(): void {
  }

  guardarStorage(){
    localStorage.setItem("himno",JSON.stringify(this.himno))
  }
  verSubCategoria( himno: Object){
    
    let buscaCategoria:Object = {
      idsub:himno['idsubCat'],
      catTitulo:himno['catTitulo'],
      subTitulo:himno['subTitulo'],
    }
    this.router.navigate(['/buscacategoria'],buscaCategoria)
  }
  reportarErro(himno: Object){

  }

}
