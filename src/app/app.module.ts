import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SingUpComponent } from './sing-up/sing-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PantallaPrincipalComponent } from './pantalla-principal/pantalla-principal.component';
import { nombreValidatorDirective } from './validators/nombre.validator';
import { rolValidatorDirective } from './validators/rol.validator';
import { LoginComponent } from './login/login.component';
import { PantallaInfoComponent } from './pantalla-info/pantalla-info.component';



@NgModule({
  declarations: [
    AppComponent,
    SingUpComponent,
    PantallaPrincipalComponent,
    nombreValidatorDirective,
    rolValidatorDirective,
    LoginComponent,
    PantallaInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
