import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Viaje } from 'src/app/models/viaje';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viaje-reservado',
  templateUrl: './viaje-reservado.component.html',
  styleUrls: ['./viaje-reservado.component.css']
})
export class ViajeReservadoComponent implements OnInit {
  active = 1;
  public isCollapsed = true;
  
  
  //Viajes
  viajes$!:Observable<Viaje[]>;
  refreshViajes$ = new BehaviorSubject<boolean>(true);
  
  constructor(
    private viajeService:ViajeService,
    private tokenService:TokenService,
    private usuarioService:UsuarioService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getIsPorte()){
      this.usuarioService.findEmpresaPorteNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.viajes$ = this.refreshViajes$.pipe(switchMap(_=>this.viajeService.findAll(data["id"])));
        }
      )
    }
    else if(this.tokenService.getIsExpedidor()){
      this.usuarioService.findExpedidorNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.viajes$ = this.refreshViajes$.pipe(switchMap(_=>this.viajeService.findAllExpedidor(data["id"])));
        }
      )
    }

  }

}
