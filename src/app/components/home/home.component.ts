import { Component, OnInit } from '@angular/core';
import { HimnosService } from 'src/app/services/himnos.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  
  //variaveis
  forma:FormGroup
  himnos:any =[]

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
    let termino = this.termino.value
    this.himnosService.getHimnos(termino).subscribe(val=>{
      this.himnos = val
      console.log("home: ",this.himnos)
    })
  }

}
