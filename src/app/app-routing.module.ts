import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { LoginComponent } from './vistas/login/login.component';
import { PantallaInfoComponent } from './vistas/pantalla-info/pantalla-info.component';
import { PantallaPrincipalComponent } from './vistas/pantalla-principal/pantalla-principal.component';
import { GuardService} from './guards/guard.service';
/*Importamos los componentes*/
import { SingUpComponent } from './vistas/sing-up/sing-up.component';
import { PanelCargaComponent } from './vistas/panel-carga/panel-carga.component';
import { ConductoresComponent } from './vistas/conductores/conductores.component';
import { SingupConductorComponent } from './vistas/singup-conductor/singup-conductor.component';
import { LoginGuard } from './guards/login.guard';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { CuentaBancariaComponent } from './vistas/cuenta-bancaria/cuenta-bancaria.component';


/*Creamos el array de rutas*/
const routes: Routes = [
  {path:'singup', component:SingUpComponent, canActivate:[LoginGuard]},
  {path:'ptprincipal', component:PantallaPrincipalComponent},
  {path:'pantalla-info', component:PantallaInfoComponent},
  {path:'login', component:LoginComponent , canActivate:[LoginGuard]},
  {path:'dashboard', component:DashboardComponent , canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor']}},
  {path:'panel-carga', component:PanelCargaComponent , canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor']}},
  {path:'conductores', component:ConductoresComponent , canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte']}},
  {path:'perfil', component:PerfilComponent , canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor']}},
  {path:'cuenta-bancaria', component:CuentaBancariaComponent , canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor']}},
  {path:'singup-conductor', component:SingupConductorComponent},
  {path: '',   redirectTo: '/ptprincipal', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
