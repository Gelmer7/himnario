import { Component, OnInit } from '@angular/core';
import { HimnosService,Himno } from 'src/app/services/himnos.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: [
  ]
})
export class BuscadorComponent implements OnInit {

  himnos:any[]=[]
  resulPronto=false
  terminoBusca:string

  constructor(  private himnosService:HimnosService,
                private activatedRoute:ActivatedRoute,
                private router:Router) { 
    this.activatedRoute.params.subscribe(val =>{
      this.terminoBusca = val.id
      this.buscarHimnos(this.terminoBusca)
    })
  }

  ngOnInit(): void {
  }

  buscarHimnos(termino:string){
    if (!termino ) { return }
    this.himnosService.getHimnos(termino).subscribe(val=>{
      this.himnos = val
      this.resulPronto = true
    })
  }
  verHimno(himno:any){
    this.router.navigate(['/himno'],himno)
  }

}
