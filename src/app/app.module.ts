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
import { swiftBicValidatorDirective } from './validators/swiftBic.validator';
import { ibanValidatorDirective } from './validators/iban.validator';
import { PanelCargaComponent } from './vistas/panel-carga/panel-carga.component';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { NavBarComponent } from './vistas/nav-bar/nav-bar.component';
import { FooterComponent } from './vistas/footer/footer.component';
import { SideBarComponent } from './vistas/side-bar/side-bar.component';
import { interceptorProvider} from './interceptors/interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConductoresComponent } from './vistas/conductores/conductores.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViajeComponent } from './vistas/viaje/viaje.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { CuentaBancariaComponent } from './vistas/cuenta-bancaria/cuenta-bancaria.component';
import { ExpedidoresComponent } from './vistas/expedidores/expedidores.component';
import { SingupExternosComponent } from './vistas/singup-externos/singup-externos.component';



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
    swiftBicValidatorDirective,
    ibanValidatorDirective,
    LoginComponent,
    PantallaInfoComponent,
    DashboardComponent,
    NavBarComponent,
    FooterComponent,
    SideBarComponent,
    PanelCargaComponent,
    ConductoresComponent,
    SingupExternosComponent,
    ViajeComponent,
    PerfilComponent,
    CuentaBancariaComponent,
    ExpedidoresComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    NgbModule,
    Ng2SearchPipeModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
