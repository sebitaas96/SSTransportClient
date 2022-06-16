import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnusComponent } from './onus.component';
import { OnusRoutingModule } from './onus.routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelCargaComponent } from './transporte/panel-carga/panel-carga.component';
import { PerfilComponent } from './layaouts/perfil/perfil.component';
import { CuentaBancariaComponent } from './layaouts/cuenta-bancaria/cuenta-bancaria.component';
import { ConductoresComponent } from './transporte/conductores/conductores.component';
import { ExpedidoresComponent } from './porte/expedidores/expedidores.component';
import { EquipoComponent } from './transporte/equipo/equipo.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BarsComponent } from './layaouts/bars/bars.component';
import { ViajeComponent } from './porte/viaje/viaje.component';
import { swiftBicValidatorDirective } from 'src/app/validators/swiftBic.validator';
import { ibanValidatorDirective } from 'src/app/validators/iban.validator';
import { tipoCamionValidatorDirective } from 'src/app/validators/tipoCamion.validator';
import { tipoRemolqueValidatorDirective } from 'src/app/validators/tipoRemolque.validator';
import { matriculaRemolqueValidatorDirective } from 'src/app/validators/matriculaRemolque.validator';
import { matriculaValidatorDirective } from 'src/app/validators/matricula.validator';
import {MatStepperModule} from '@angular/material/stepper';
import { SharedModule } from 'src/app/shared.module';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { ViajesExpedidosComponent } from './porte/viajes-expedidos/viajes-expedidos.component';
import { NgxSimpleCountdownModule } from 'ngx-simple-countdown';
import  {ViajeReservadoComponent} from './transporte/viaje-reservado/viaje-reservado.component';
import { PagosComponent } from './layaouts/pagos/pagos.component';
import { FooterAuthComponent } from './layaouts/footer-auth/footer-auth.component';
import { FooterInsideComponent } from '../vistasAutorizados/footer-inside/footer-inside.component'

import { ToastrModule } from 'ngx-toastr';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [OnusComponent,
    DashboardComponent,
    PanelCargaComponent,
    PerfilComponent,
    CuentaBancariaComponent,
    ConductoresComponent,
    ExpedidoresComponent,
    EquipoComponent,
    BarsComponent,
    ViajeComponent,
    swiftBicValidatorDirective,
    ibanValidatorDirective,
    tipoCamionValidatorDirective,
    tipoRemolqueValidatorDirective,
    matriculaRemolqueValidatorDirective,
    matriculaValidatorDirective,
    ViajesExpedidosComponent,
    ViajeReservadoComponent,
    PagosComponent,
    FooterAuthComponent,
    FooterInsideComponent


],
  imports: [
    CommonModule,
    OnusRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    MatStepperModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyAOnIWK_ZXwvEKuYsszLJU7Nd0FMOvUDi8'
    }),
    AgmDirectionModule,
    NgxSimpleCountdownModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgApexchartsModule
  ]
})
export class OnusModule { }