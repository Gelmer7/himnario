import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HimnoComponent } from './components/himno/himno.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { BuscarCategoriaComponent } from './components/buscar-categoria/buscar-categoria.component';


const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path: 'categorias', component:CategoriasComponent},
  { path: 'about', component:AboutComponent},
  { path: 'himno', component:HimnoComponent},
  { path: 'buscahimno/:id', component:BuscadorComponent},
  { path: 'buscacategoria', component:BuscarCategoriaComponent},
  { path: '', pathMatch:'full', redirectTo:'home'},
  { path: '**', pathMatch:'full', redirectTo:'home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
