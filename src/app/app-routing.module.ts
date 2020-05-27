import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';


const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path: 'categorias', component:CategoriasComponent},
  { path: 'about', component:AboutComponent},
  { path: '', pathMatch:'full', redirectTo:'home'},
  { path: '**', pathMatch:'full', redirectTo:'home'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
