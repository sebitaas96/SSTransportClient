import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentaBancariaComponent } from './layaouts/cuenta-bancaria/cuenta-bancaria.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './layaouts/perfil/perfil.component';

import { OnusComponent } from './onus.component';
import { ExpedidoresComponent } from './porte/expedidores/expedidores.component';
import { ConductoresComponent } from './transporte/conductores/conductores.component';
import { PanelCargaComponent } from './transporte/panel-carga/panel-carga.component';
import { EquipoComponent } from './transporte/equipo/equipo.component';
import { ViajeComponent } from './porte/viaje/viaje.component';
import { GuardService } from 'src/app/guards/guard.service';
import { ViajesExpedidosComponent } from './porte/viajes-expedidos/viajes-expedidos.component';
import { ViajeReservadoComponent } from './transporte/viaje-reservado/viaje-reservado.component';

const routes: Routes = [
    {
        path: 'onus',
        component: OnusComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor' , 'porte','expedidor']}
            },
            {
                path: 'panel-carga',
                component: PanelCargaComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor']}
            },
            {
                path: 'conductores',
                component: ConductoresComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte']}
            },
            {
                path: 'expedidores',
                component: ExpedidoresComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin','porte']}
            },
            {
                path: 'perfil',
                component: PerfilComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor' , 'porte','expedidor']}
            },
            {
                path: 'cuenta-bancaria',
                component: CuentaBancariaComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor' , 'porte','expedidor']}
            },
            {
                path: 'equipo',
                component: EquipoComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin' , 'transporte' , 'conductor']}
            },
            {
                path: 'viaje',
                component: ViajeComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin','porte','expedidor']}
            },
            {
                path: 'viajes-expedidos',
                component: ViajesExpedidosComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin','porte','expedidor']}
            },
            {
                path: 'viajes-reservados',
                component: ViajeReservadoComponent,
                canActivate:[GuardService] , data:{expectedRol: ['admin','transporte','conductor']}
            }
            
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnusRoutingModule { }