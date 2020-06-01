import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  constructor( private router:Router ) { }

  ngOnInit(): void {
  }
  buscarHimnos( termino:string){
    console.log(termino);
    this.router.navigate(['/buscador', termino] )
  }

}
