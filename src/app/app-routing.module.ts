import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/vistasNoAutorizados/login/login.component';
import { PantallaInfoComponent } from './vistas/vistasNoAutorizados/pantalla-info/pantalla-info.component';
import { PantallaPrincipalComponent } from './vistas/vistasNoAutorizados/pantalla-principal/pantalla-principal.component';
import { GuardService} from './guards/guard.service';
/*Importamos los componentes*/
import { SingUpComponent } from './vistas/vistasNoAutorizados/sing-up/sing-up.component';
import { SingupExternosComponent } from './vistas/vistasNoAutorizados/singup-externos/singup-externos.component';
import { LoginGuard } from './guards/login.guard';
import { OnusComponent } from './vistas/vistasAutorizados/onus.component';
import { ConfirmacionComponent } from './vistas/vistasNoAutorizados/confirmacion/confirmacion.component';



/*Creamos el array de rutas*/
const routes: Routes = [
  {path:'singup', component:SingUpComponent, canActivate:[LoginGuard]},
  {path:'ptprincipal', component:PantallaPrincipalComponent},
  {path:'confirmacion', component:ConfirmacionComponent},
  {path:'pantalla-info', component:PantallaInfoComponent},
  {path:'login', component:LoginComponent , canActivate:[LoginGuard]},
  {path:'onus', component:OnusComponent , canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor' , 'porte','expedidor']}},
  {path:'singup-externos', component:SingupExternosComponent},
  {path: '',   redirectTo: '/ptprincipal', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
