import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PaisService } from './services/pais.service';
import { ProvinciaService } from './services/provincia.service';
import { LocalidadService } from './services/localidad.service';
import { DireccionService } from './services/direccion.service';
import { UsuarioService } from './services/usuario.service';
import { ViajeService } from './services/viaje.service';
import { RolService } from './services/rol.service';
import { EstadoService } from './services/estado.service';
import { CuentaBancariaService } from './services/cuenta-bancaria.service';
import { TipoRemolqueService } from './services/tipo-remolque.service';
import { PagoService } from './services/pago.service';
import { CamionService } from './services/camion.service';
import { RemolqueService } from './services/remolque.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [PaisService, ProvinciaService, LocalidadService, DireccionService, UsuarioService, ViajeService, RolService, EstadoService, CuentaBancariaService, TipoRemolqueService, PagoService, CamionService, RemolqueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
