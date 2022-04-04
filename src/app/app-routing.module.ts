import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { PantallaInfoComponent } from './vistas/pantalla-info/pantalla-info.component';
import { PantallaPrincipalComponent } from './vistas/pantalla-principal/pantalla-principal.component';

/*Importamos los componentes*/
import { SingUpComponent } from './vistas/sing-up/sing-up.component';


/*Creamos el array de rutas*/
const routes: Routes = [
  {path:'singup', component:SingUpComponent},
  {path:'ptprincipal', component:PantallaPrincipalComponent},
  {path:'pantalla-info', component:PantallaInfoComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
