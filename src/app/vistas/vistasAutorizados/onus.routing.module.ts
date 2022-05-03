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

const routes: Routes = [
    {
        path: 'onus',
        component: OnusComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'panel-carga',
                component: PanelCargaComponent
            },
            {
                path: 'conductores',
                component: ConductoresComponent
            },
            {
                path: 'expedidores',
                component: ExpedidoresComponent
            },
            {
                path: 'perfil',
                component: PerfilComponent
            },
            {
                path: 'cuenta-bancaria',
                component: CuentaBancariaComponent
            },
            {
                path: 'equipo',
                component: EquipoComponent
            },
            {
                path: 'viaje',
                component: ViajeComponent
            }
            
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnusRoutingModule { }