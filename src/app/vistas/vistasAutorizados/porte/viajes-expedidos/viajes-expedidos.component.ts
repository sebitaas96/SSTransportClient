import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data } from 'jquery';
import { BehaviorSubject, flatMap, from, Observable, switchMap } from 'rxjs';
import { Viaje } from 'src/app/models/viaje';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import {ReactivarViaje} from 'src/app/dto/reactivarViaje';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService} from 'src/app/services/notificacion.service'; 
import { GravedadService} from 'src/app/services/gravedad.service'; 
import {NuevaNotificacion} from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
import { Usuario } from 'src/app/models/usuario';
declare var $:any;

@Component({
  selector: 'app-viajes-expedidos',
  templateUrl: './viajes-expedidos.component.html',
  styleUrls: ['./viajes-expedidos.component.css']
})
export class ViajesExpedidosComponent implements OnInit {
  active = 1;
  public isCollapsed = true;
  idViajeAReactivar:number;
  idViajeAEliminar:number;
  viajeTiempo:number;
  closeResult = '';


  //Time
  shortTime:boolean;
  hoy=new Date();
  
  //Acctions
  isCancelado:boolean;
  notCancelado:boolean;
  errMsjCancelado:string;
  isReactivado:boolean;
  notReactivado:boolean;
  errMsjReactivado:string;
  isEliminado:boolean;
  notEliminado:boolean;
  errMsjEliminado:string;
  
  //Viajes
  viajes$!:Observable<Viaje[]>;
  refreshViajes$ = new BehaviorSubject<boolean>(true);

    //Notificaciones
    gravedad$!:Gravedad[];
    usuario$!:Usuario;
  
  constructor(
    private viajeService:ViajeService,
    private tokenService:TokenService,
    private usuarioService:UsuarioService,
    private modalService: NgbModal,
    private gravedadService:GravedadService,
    private notificacionService:NotificacionService,
    private toastr: ToastrService
  ) { 
    //Time
    this.shortTime = false;

    //Actions
    this.isCancelado = false;
    this.notCancelado = false;
    this.errMsjCancelado ="";
    this.idViajeAReactivar = 0;
    this.idViajeAEliminar =0;
    this.viajeTiempo =0;
    this.isReactivado = false;
    this.notReactivado = false;
    this.errMsjReactivado = "";
    this.isEliminado = false;
    this.notEliminado = false;
    this.errMsjEliminado = "";
    

  }

  ngOnInit(): void {
    
    if(this.tokenService.getIsPorte()){
      this.usuarioService.findEmpresaPorteNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.usuario$ = data;
          this.viajes$ = this.refreshViajes$.pipe(switchMap(_=>this.viajeService.findAll(data["id"])));
        }
      )
    }
    else if(this.tokenService.getIsExpedidor()){
      this.usuarioService.findExpedidorNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.usuario$ = data;
          this.viajes$ = this.refreshViajes$.pipe(switchMap(_=>this.viajeService.findAllExpedidor(data["id"])));
        }
      )
    }

    this.gravedadService.findAll().subscribe(
      data=>{
        this.gravedad$ = data;
      }
    )
  }


   /*Renew Hours*/
   checkTime(){
    var fVal = new Date($("#fHoraFin").val());
    var fMin = new Date($("#fHoraFin").attr("min"));
    if(fVal.getTime()<fMin.getTime()){
      this.shortTime = true;
    }
    else {
      this.shortTime = false;
    }
  }

  updateTime(){
    console.log($("#fInicio").val());
    if($("#fInicio").val() != ""){
      $("#submitModal").removeAttr("disabled","disabled")
      var fechaEstimada = new Date(new Date($("#fInicio").val()).getTime()+(this.viajeTiempo*1000));
      fechaEstimada.setMinutes(fechaEstimada.getMinutes()-fechaEstimada.getTimezoneOffset());
      $("#fHoraFin").val(fechaEstimada.toISOString().slice(0,16));
      $("#fHoraFin").attr("min",fechaEstimada.toISOString().slice(0,16));
    }
    else{
      $("#submitModal").attr("disabled","disabled")
    }
   
  }


  CancelarViaje(viajeId:number){
    this.viajeService.cancelarViaje(viajeId).subscribe(
      data=>{
        this.refreshViajes$.next(true);
        var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success(data["mensaje"] , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      },
      err=>{
        var notificacion = new NuevaNotificacion(err['error']['mensaje'] , new Date(),this.usuario$.id, this.gravedad$[2].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
        this.toastr.error(err['error']['mensaje'], 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      }
    )
  }

  ReactivarViaje(data:any){
    var fInicio = new Date($("#fInicio").val()); 
    var fFin = new Date($("#fHoraFin").val());
    console.log(fInicio , fFin);
    var reactivarViaje = new ReactivarViaje(this.idViajeAReactivar , fInicio, fFin);
    this.viajeService.reactivarViaje(reactivarViaje).subscribe(
      data=>{
        this.refreshViajes$.next(true);
        var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success(data["mensaje"] , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      },
      err=>{
        var notificacion = new NuevaNotificacion(err['error']['mensaje'] , new Date(),this.usuario$.id, this.gravedad$[2].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
        this.toastr.error(err['error']['mensaje'], 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      }
    )

  }

  EliminarViaje(data:any){
    this.viajeService.eliminarViaje(this.idViajeAEliminar).subscribe(
      data=>{
        this.refreshViajes$.next(true);
        var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success(data["mensaje"] , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      },
      err=>{
        var notificacion = new NuevaNotificacion(err['error']['mensaje'] , new Date(),this.usuario$.id, this.gravedad$[2].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
        this.toastr.error(err['error']['mensaje'], 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      }
    )
  }

  open(content:any , viajeId:number ,viajeTimepo:number) {
    this.idViajeAReactivar = viajeId;
    this.idViajeAEliminar = viajeId;
    this.viajeTiempo = viajeTimepo;
    var fecha = new Date();
    $("#fInicio").val(fecha.toISOString().slice(0,16));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size:'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  RealizarPago(idViaje:number){

  }

  RechazarPago(idViaje:number){

  }
  
}
