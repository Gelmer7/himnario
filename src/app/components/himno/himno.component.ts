import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Himno } from 'src/app/services/himnos.service';

@Component({
  selector: 'app-himno',
  templateUrl: './himno.component.html',
  styles: [
  ]
})
export class HimnoComponent implements OnInit {

  himno:any

  constructor(  private router:Router) {

    if (this.router.getCurrentNavigation().extras.replaceUrl) {
      this.himno = JSON.parse(localStorage.getItem("himno"))
    } else{
      this.himno = this.router.getCurrentNavigation().extras
      this.guardarStorage()
    }
   }

  ngOnInit(): void {
  }

  guardarStorage(){
    localStorage.setItem("himno",JSON.stringify(this.himno))
  }

}
