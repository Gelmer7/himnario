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
    this.himno = this.router.getCurrentNavigation().extras
    console.log(this.himno);
   }

  ngOnInit(): void {

  }

}
