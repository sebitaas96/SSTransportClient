import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*Importamos los componentes*/
import { SingUpComponent } from './sing-up/sing-up.component';


/*Creamos el array de rutas*/
const routes: Routes = [
  {path:'singup', component:SingUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
