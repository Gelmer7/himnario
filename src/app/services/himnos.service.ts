import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class HimnosService {
  
  catego:any[]=[]
 
  constructor( private http:HttpClient ) { 
  }

  getHimnos( termino:string){
    let himnos:Himno[]=[]
    return this.http.get('assets/json/himnosV2.json')
    .pipe(map( (data:Himno) =>{

      return this.buscarHimnos(termino, data)
    }))
  }
  getHimnosCategoria(idsubCat:string){
    let himnos:Himno[]=[]
    return this.http.get('assets/json/himnosV2.json')
    .pipe(map( (hims:any[]) =>{
      hims.forEach((himn:any) => {
        if (himn.idsubCat == idsubCat) {
          himnos.push(himn)
        }
      });
      return himnos
    }))
  }
  buscaCategoria( idsubCategoria: string){
    return this.http.get('assets/json/categorias.json')
    .pipe(map( (cates:any[]) =>{
      cates.forEach(cat => {
        cat.subCategoria.forEach(sub => {
          if (sub.id == idsubCategoria) {
            console.log("ids: ", sub.id, idsubCategoria);
            return {
              categoria:cat.titulo,
              subCategoria:sub.titulo
            }
          }
        })
      })
      console.log('cates: ', cates);
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

  
  getCategorias(){    //funcao que cria ids de categoria e subcategoria
    let categ:number = 0
    return this.http.get<Categoria[]>('assets/json/categorias.json')
    /*.pipe(map( val =>{    
      val.forEach(categoria => {
        categoria.id = 'idcat'+(categ++).toString()+'a'
        let subCateg:number = 0
        categoria.subCategoria.forEach(subCat => {
          subCat.id = 'idsub'+(subCateg++).toString()+'a'
        });
      });
      return val
    })) */
  }

/*   himnos(){  //obtem himnos no formato simplificado, 
    return this.http.get('assets/json/himnosok.json')
    .pipe(
      map((himn:any[]) =>{
        himn.forEach(himno => {
          this.categoriaNumero.forEach(num => {
            if (himno.numero == num.numero) {
              himno.idcat =   num.cat
              himno.idsubCat =   num.sub
              himno.catTitulo = num.catTitulo
              himno.subTitulo = num.subCatTitulo
            }
          });
        });
        console.log("himno: ",himn);
        return himn
      })
    )
  } */

 /*  categorias(){    //acrescenta id de categorias e subcategorias no objeto himno
   return this.http.get('assets/json/categorias.json')
    .pipe(
      map( (val:any[]) =>{
        val.forEach((cat:any) => {
          cat.subCategoria.forEach((sub:any) => {
            sub.himnos.forEach(him => {
              this.catego.push({
                numero:him,
                cat:cat.id,
                sub:sub.id,
                catTitulo:cat.titulo,
                subCatTitulo:sub.titulo

              })
            });
            
          })
        });
        return this.catego
      })
    )
  } */

  /* getHimnos( termino:string){ //funcao que pega himnos do json original
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
  } */



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
  idcategoria?:string
  idsubCategoria?:string
}
export interface Categoria {
  titulo: string
  subCategoria: Array<SubCategoria>
  id:string
}
export interface SubCategoria {
  titulo: string
  himnos: Array<number>
  id:string
  categoria?:string
}