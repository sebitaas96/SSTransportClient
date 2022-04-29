import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentaBancaria } from 'src/app/models/cuenta-bancaria';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PerfilComponent } from './layaouts/perfil/perfil.component';

import { OnusComponent } from './onus.component';
import { ExpedidoresComponent } from './porte/expedidores/expedidores.component';
import { ConductoresComponent } from './transporte/conductores/conductores.component';
import { PanelCargaComponent } from './transporte/panel-carga/panel-carga.component';

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
                component: CuentaBancaria
            }
            
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnusRoutingModule { }