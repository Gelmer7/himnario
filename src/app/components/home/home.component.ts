import { Component, OnInit } from '@angular/core';
import { HimnosService, Himno } from 'src/app/services/himnos.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { isUndefined } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  
  //variaveis
  forma:FormGroup
  terminoBusca:string
  resulPronto= false
  himnos:Himno [] = []

  constructor(  private himnosService:HimnosService,
                private fb:FormBuilder) {
  this.creaFormulario()
  }

  ngOnInit(): void {
  }

  get termino(){
    return this.forma.get('termino') as FormControl
  }
  creaFormulario(){
    this.forma=this.fb.group({
      termino:['']
    })
  }

  buscarHimnos(){
    if (!this.termino.value ) {
      return
    }
    this.terminoBusca = this.termino.value
    
    this.himnosService.getHimnos(this.terminoBusca).subscribe(val=>{
      this.himnos = val
      console.log("home: ",this.himnos)
      this.resulPronto = true
    })
  }

}
