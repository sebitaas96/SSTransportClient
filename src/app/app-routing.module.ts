import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { LoginComponent } from './vistas/login/login.component';
import { PantallaInfoComponent } from './vistas/pantalla-info/pantalla-info.component';
import { PantallaPrincipalComponent } from './vistas/pantalla-principal/pantalla-principal.component';
import { GuardService} from './guards/guard.service';
/*Importamos los componentes*/
import { SingUpComponent } from './vistas/sing-up/sing-up.component';
import { LoginGuard } from './guards/login.guard';


/*Creamos el array de rutas*/
const routes: Routes = [
  {path:'singup', component:SingUpComponent, canActivate:[LoginGuard]},
  {path:'ptprincipal', component:PantallaPrincipalComponent},
  {path:'pantalla-info', component:PantallaInfoComponent},
  {path:'login', component:LoginComponent , canActivate:[LoginGuard]},
  {path:'dashboard', component:DashboardComponent , canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
