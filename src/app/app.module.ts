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
import { LoginComponent } from './vistas/vistasNoAutorizados/login/login.component';
import { PantallaInfoComponent } from './vistas/vistasNoAutorizados/pantalla-info/pantalla-info.component';
import { NavBarComponent } from './vistas/vistasNoAutorizados/nav-bar/nav-bar.component';
import { FooterComponent } from './vistas/vistasNoAutorizados/footer/footer.component';
import { interceptorProvider} from './interceptors/interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SingupExternosComponent } from './vistas/vistasNoAutorizados/singup-externos/singup-externos.component';
import { OnusModule } from './vistas/vistasAutorizados/onus.module';
import { SharedModule } from './shared.module';



@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent,
    PantallaPrincipalComponent,
    LoginComponent,
    PantallaInfoComponent,
    NavBarComponent,
    FooterComponent,
    SingupExternosComponent
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
    OnusModule,
    SharedModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
