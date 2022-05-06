import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SingUpComponent } from './vistas/vistasNoAutorizados/sing-up/sing-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PantallaPrincipalComponent } from './vistas/vistasNoAutorizados/pantalla-principal/pantalla-principal.component';
import { nombreValidatorDirective } from './validators/nombre.validator';
import { LoginComponent } from './vistas/vistasNoAutorizados/login/login.component';
import { DashboardComponent } from './vistas/vistasAutorizados/dashboard/dashboard.component';
import { PantallaInfoComponent } from './vistas/vistasNoAutorizados/pantalla-info/pantalla-info.component';
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
import { NavBarComponent } from './vistas/vistasNoAutorizados/nav-bar/nav-bar.component';
import { FooterComponent } from './vistas/vistasNoAutorizados/footer/footer.component';
import { interceptorProvider} from './interceptors/interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SingupExternosComponent } from './vistas/vistasNoAutorizados/singup-externos/singup-externos.component';
import { OnusModule } from './vistas/vistasAutorizados/onus.module';



@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent,
    PantallaPrincipalComponent,
    LoginComponent,
    PantallaInfoComponent,
    NavBarComponent,
    FooterComponent,
    SingupExternosComponent,
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
    nombreUsuarioValidatorDirective
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
    OnusModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
