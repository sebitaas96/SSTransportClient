import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Viaje } from 'src/app/models/viaje';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-viajes-expedidos',
  templateUrl: './viajes-expedidos.component.html',
  styleUrls: ['./viajes-expedidos.component.css']
})
export class ViajesExpedidosComponent implements OnInit {
  active = 1;
  public isCollapsed = true;
  
  //Acctions
  isCancelado:boolean;
  notCancelado:boolean;
  errMsjCancelado:string;
  
  //Viajes
  viajes$!:Observable<Viaje[]>;
  refreshViajes$ = new BehaviorSubject<boolean>(true);
  
  constructor(
    private viajeService:ViajeService,
    private tokenService:TokenService,
    private usuarioService:UsuarioService
  ) { 
    //Actions
    this.isCancelado = false;
    this.notCancelado = false;
    this.errMsjCancelado ="";

  }

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

  CancelarViaje(viajeId:number){
    this.viajeService.cancelarViaje(viajeId).subscribe(
      data=>{
        this.isCancelado = true;
        this.notCancelado = false;
        this.errMsjCancelado = data["mensaje"];
        console.log(data);
        this.refreshViajes$.next(true);
      },
      err=>{
        this.notCancelado = true;
        this.isCancelado = false;
        this.errMsjCancelado = err['error']['mensaje'];
      }
    )
  }

}