import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';

/*Importamos los componentes*/
import { SingUpComponent } from './sing-up/sing-up.component';


/*Creamos el array de rutas*/
const routes: Routes = [
  {path:'singup', component:SingUpComponent},
  {path:'ptprincipal', component:PantallaPrincipalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
