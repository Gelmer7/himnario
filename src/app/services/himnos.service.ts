import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class HimnosService {
  

  constructor( private http:HttpClient ) { 
  }

  himnos(){
    let himnos:any="hola"
   
    return this.http.get('assets/json/himnos.json')
    .pipe(
      map((himn:any) =>{
        himn.forEach((parteHimno:any) => {
          let contador:number = 0

          parteHimno.urls.forEach(elem => {  //lyric
            if (elem.locale == 'es' && elem.type == 'youtube') {
              contador++
            }
          })
          if (contador >1) {
              console.log(" =2: ",parteHimno);
            }
            if (contador == 1) {
              console.log("conatdor :1");
            }
            if (contador == 0) {
              console.log("conatdor :0", parteHimno);
            }
          
        })
        return "hola"
      })
    )
  }

  getHimnos( termino:string){
    let himnos:Himno[]=[]
    return this.http.get('assets/json/himnos.json')
    .pipe(map( (data:any) =>{
      data.forEach((el:any) => {
        let himno=Object.assign({})  //una especie de inicializacion
        el.lyrics.forEach((el:any) => {
          if (el['locale'] == 'es' ) {
            himno.contenido = el.content
            himno.idioma = el.locale
            himno.autor_es = el.author
            himno.resumen = el.content.substring(0,100)+"..."
          }
        })
        el.urls.forEach((el:any) => {
          if (el.type == 'youtube') {
            himno.urlYoutube = el.url
          }
        })
        el.titles.forEach((el:any) => {
          if (el.locale == 'es') {
            himno.titulo = el.title
          }
        })
        himno.notas = el.notes
        himno.autorMusica=el.musicAuthor
        himno.autores = el.musicAuthor 
        himno.numero = el._number 
        himno.edicion= "Himnario2009"
        himnos.push(himno)
      })
      return this.buscarHimnos(termino, himnos)
    }))
  }

  buscarHimnos( termino:string, himnos:any){
    let himnosArr:any=[]
    termino = termino.toLowerCase().trim()
    for (let i = 0; i < himnos.length; i++) {
      let himno = himnos[i]
      let nome = this.eliminarDiacriticos (himno.titulo.toLowerCase())
      let numero = himno.numero.toString()
      
      if (nome?.indexOf(termino) >= 0 || numero == termino) {
        himnosArr.push(himno)
      }
    }
    return himnosArr
  }

  eliminarDiacriticos(cadena:string) {
    return cadena.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
  }
}

export interface Himno {
  numero:number
  contenido:string
  titulo:string
  autores:Array<string>
  autor_es:string
  notas:string
  urlYoutube:string
  idioma:string
  edicion:string
  resumen?:string
}
export interface Categoria {
  titulo: string
  subCategoria: Array<SubCategoria>
}
export interface SubCategoria {
  titulo: string
  himnos: Array<number>
}