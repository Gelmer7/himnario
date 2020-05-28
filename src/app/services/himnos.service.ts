import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class HimnosService {
  

  constructor( private http:HttpClient ) { 
  }

  getHimnos( termino:string){
    let himnos:any=[]
    return this.http.get('assets/json/himnos.json')
    .pipe(map( (data:any) =>{
      data.forEach(el => {
        let himno:any
        el.lyrics.forEach(el => {
          if (el.locale == 'es' ) {
            himno = el
          }
        })
        el.urls.forEach(el => {
          if (el.type == 'youtube') {
            himno.url = el.url
          }
        })
        himno.autores = el.musicAuthor 
        himno.numero = el._number 
        himnos.push(himno)
      })
      return this.buscarHimnos(termino, himnos)
    }))
  }

  buscarHimnos( termino:string, himnos:any){
    let himnosArr:any=[]
    termino = termino.toLowerCase()
    for (let i = 0; i < himnos.length; i++) {
      let himno = himnos[i]
      let nome = himno.title?.toLowerCase()
      let numero = himno.numero.toString()

      if (nome?.indexOf(termino) >= 0 || numero == termino) {
        himnosArr.push(himno)
      }
    }
    return himnosArr
  }
}