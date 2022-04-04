import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SingUpComponent } from './vistas/sing-up/sing-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PantallaPrincipalComponent } from './vistas/pantalla-principal/pantalla-principal.component';
import { nombreValidatorDirective } from './validators/nombre.validator';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { PantallaInfoComponent } from './vistas/pantalla-info/pantalla-info.component';
import { documentoValidatorDirective } from './validators/documento.validator';
import { paisValidatorDirective } from './validators/pais.validator';
import { provinciaValidatorDirective } from './validators/provincia.validator';
import { localidadValidatorDirective } from './validators/localidad.validator';
import { tipoviaValidatorDirective } from './validators/tipovia.validator';
import { direccionValidatorDirective } from './validators/direccion.validator';
import { numeroValidatorDirective } from './validators/numero.validator';
import { prefijoValidatorDirective } from './validators/prefijo.validator';
import { telefonoValidatorDirective } from './validators/telefono.validator';
import { emailValidatorDirective } from './validators/email.validator';
import { checkboxValidatorDirective } from './validators/checkbox.validator';
import { passwordValidatorDirective } from './validators/password.validator';
import { nombreUsuarioValidatorDirective } from './validators/nombreUsuario.validator';
import { tipoEmpresaValidatorDirective } from './validators/tipoEmpresa.validator';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent,
    PantallaPrincipalComponent,
    nombreValidatorDirective,
    tipoEmpresaValidatorDirective,
    documentoValidatorDirective,
    paisValidatorDirective,
    provinciaValidatorDirective,
    localidadValidatorDirective,
    tipoviaValidatorDirective,
    direccionValidatorDirective,
    numeroValidatorDirective,
    prefijoValidatorDirective,
    telefonoValidatorDirective,
    emailValidatorDirective,
    checkboxValidatorDirective,
    passwordValidatorDirective,
    nombreUsuarioValidatorDirective,
    LoginComponent,
    PantallaInfoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
