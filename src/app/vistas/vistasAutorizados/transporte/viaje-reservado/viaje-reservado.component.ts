import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, flatMap, Observable, switchMap } from 'rxjs';
import { Conductor } from 'src/app/models/conductor';
import { Viaje } from 'src/app/models/viaje';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import {AsignarConductor} from 'src/app/dto/asignarConductor';
import {AsignarCamion} from 'src/app/dto/asignarCamion';
import {AsignarRemolque} from 'src/app/dto/asignarRemolque';
import {UpdateFecha} from 'src/app/dto/udpateFecha';
import { data } from 'jquery';
import { CamionService } from 'src/app/services/camion.service';
import { RemolqueService } from 'src/app/services/remolque.service';
import { Camion } from 'src/app/models/camion';
import { Remolque } from 'src/app/models/remolque';
import { PagoService } from 'src/app/services/pago.service';
import { TipoRemolque } from 'src/app/models/tipo-remolque';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService} from 'src/app/services/notificacion.service'; 
import { GravedadService} from 'src/app/services/gravedad.service'; 
import {NuevaNotificacion} from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-viaje-reservado',
  templateUrl: './viaje-reservado.component.html',
  styleUrls: ['./viaje-reservado.component.css']
})
export class ViajeReservadoComponent implements OnInit {
  active = 1;
  public isCollapsed = true;
  isConductor:boolean;
  
  //Viajes
  viajes$!:Observable<Viaje[]>;
  refreshViajes$ = new BehaviorSubject<boolean>(true);
  conductores$!:Observable<Conductor[]>;

  camiones$!:Observable<Camion[]>;
  remolques$!:Observable<Remolque[]>;
  refreshCamiones$ = new BehaviorSubject<boolean>(true);
  refreshRemolques$ = new BehaviorSubject<boolean>(true);
  
  isRefused:boolean;
  errMsj:string;
  renewCamion:boolean;
  renewRemolque:boolean;
  renewLlegada:boolean;
  renewEntrega:boolean;

      //Notificaciones
      gravedad$!:Gravedad[];
      usuario$!:Usuario;
  
  constructor(
    private viajeService:ViajeService,
    private tokenService:TokenService,
    private usuarioService:UsuarioService,
    private camionService:CamionService,
    private remolqueService:RemolqueService,
    private pagoService:PagoService
    ,  private gravedadService:GravedadService,
    private notificacionService:NotificacionService,
    private toastr: ToastrService,
  ) {

    this.isRefused = false;
    this.errMsj = "";
    this.renewCamion = false;
    this.renewRemolque = false;
    this.renewLlegada =false;
    this.renewEntrega = false;
    this.isConductor = false;
   }

  ngOnInit(): void {
    if(this.tokenService.getIsTransporte()){
      this.usuarioService.findEmpresaTransprte(this.tokenService.getUserName()).subscribe(
        data=>{
          this.usuario$ = data;
          this.viajes$ = this.refreshViajes$.pipe(switchMap(_=>this.viajeService.findAllTransporte(data["id"])));
          this.conductores$ = this.usuarioService.findAllConductores(data["id"]);
        }
      )
    }
    else if(this.tokenService.getIsConductor()){
      this.usuarioService.findConductorNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.usuario$ = data;
          this.viajes$ = this.refreshViajes$.pipe(switchMap(_=>this.viajeService.findAllConductor(data["id"])));
          this.isConductor = true;
        }
      )
    }

    this.gravedadService.findAll().subscribe(
      data=>{
        this.gravedad$ = data;
      }
    )

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

  IniciarViaje(viajeId:number , conductor:Conductor|null , remolque:Remolque|null , camion:Camion|null , tipoRemolque:TipoRemolque|null){

    if(conductor !=null && camion !=null){
      if(tipoRemolque!=null){
        if(remolque!=null){
          this.viajeService.IniciarViaje(viajeId).subscribe(
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
        else{
          this.errMsj ="Datos no completados";
          var notificacion = new NuevaNotificacion(this.errMsj , new Date(),this.usuario$.id, this.gravedad$[2].id);
          this.notificacionService.addNotificacion(notificacion).subscribe();
          this.toastr.error(this.errMsj, 'Notificación',{
            progressBar:true,
            timeOut: 3000,
            easing:'ease-in',
            easeTime:300
          });
        }
      }else{
        this.viajeService.IniciarViaje(viajeId).subscribe(
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

    }
    else{
      this.errMsj ="Datos no completados";
      var notificacion = new NuevaNotificacion(this.errMsj , new Date(),this.usuario$.id, this.gravedad$[2].id);
      this.notificacionService.addNotificacion(notificacion).subscribe();
      this.toastr.error(this.errMsj, 'Notificación',{
        progressBar:true,
        timeOut: 3000,
        easing:'ease-in',
        easeTime:300
      });
    }
  }

  FinalizarViaje(viajeId:number){
    this.viajeService.FinalizarViaje(viajeId).subscribe(
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

    this.pagoService.generarPago(viajeId).subscribe(
      data=>{
        var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
 
        this.toastr.success(data["mensaje"] , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      },err=>{
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

  close(type:string){
    switch(type){
      case 'horaInicio' : this.renewLlegada = false;break;
      case 'horaFin' : this.renewEntrega = false;break;
      case 'Camion' : this.renewCamion = false;break;
      case 'Remolque' : this.renewRemolque = false;break;
    }
  }

  CambiarHoraEntrega(){
    this.renewEntrega = true;
  }


  CambiarHoraLlegada(){
    this.renewLlegada = true;
  }

  asignarHoraEntrega(data:any , idViaje:any , fHoraFin:any){
    var fecha = new Date(data);
    var fechaFin = new Date(fHoraFin);

    if(fecha.getTime()>fechaFin.getTime()){
      var updateFecha = new UpdateFecha(idViaje , fecha);
      this.viajeService.updateFechaFin(updateFecha).subscribe(
        data=>{
          this.refreshViajes$.next(true);
          this.renewEntrega = false;
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
    else{
      var notificacion = new NuevaNotificacion("No puedes asignar una fecha inferior a la de fin", new Date(),this.usuario$.id, this.gravedad$[2].id);
      this.notificacionService.addNotificacion(notificacion).subscribe();
      this.toastr.error("No puedes asignar una fecha inferior a la de fin", 'Notificación',{
        progressBar:true,
        timeOut: 3000,
        easing:'ease-in',
        easeTime:300
      });
    }

  }

  asignarHoraLlegada(data:any , idViaje:any , fHoraInicio:any){
    var fechaInico = new Date(fHoraInicio);
    var fecha = new Date(data);

    if(fecha.getTime()>fechaInico.getTime()){
      var updateFecha = new UpdateFecha(idViaje , fecha);
      this.viajeService.updateFechaInicio(updateFecha).subscribe(
        data=>{
          this.refreshViajes$.next(true);
          this.renewLlegada = false;
          var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
          this.notificacionService.addNotificacion(notificacion).subscribe();
   
          this.toastr.success(data["mensaje"] , 'Notificación',{
            progressBar:true,
            timeOut: 3000,
            easing:'ease-in',
            easeTime:300
          });
        },err=>{
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
    }else{
      var notificacion = new NuevaNotificacion("No puedes asignar una fecha inferior a la de inicio", new Date(),this.usuario$.id, this.gravedad$[2].id);
      this.notificacionService.addNotificacion(notificacion).subscribe();
      this.toastr.error("No puedes asignar una fecha inferior a la de inicio", 'Notificación',{
        progressBar:true,
        timeOut: 3000,
        easing:'ease-in',
        easeTime:300
      });

    }

  }


  cambiarCamion(idConductor:any){
    this.renewCamion = true;
    this.camiones$ = this.refreshCamiones$.pipe(switchMap(_=>this.camionService.findAllConductor(idConductor)));
    

  }


  asignarCamion(data:any , viajeId:any){
    var camion:Camion = data;
    var asignarCamion = new AsignarCamion(viajeId , camion);
    this.viajeService.asignarCamion(asignarCamion).subscribe(
      data=>{
        this.refreshViajes$.next(true);
        this.renewCamion = false;
        var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
 
        this.toastr.success(data["mensaje"] , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      },err=>{
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

  cambiarRemolque(idConductor:any){
    this.renewRemolque = true;
    this.remolques$ = this.refreshRemolques$.pipe(switchMap(_=>this.remolqueService.findAllConductor(idConductor)));
  }

  

  asignarRemolque(data:any , viajeId:any){
    var remolque:Remolque = data;
    var asignarRemolque = new AsignarRemolque(viajeId , remolque);
    this.viajeService.asignarRemolque(asignarRemolque).subscribe(
      data=>{
        this.refreshViajes$.next(true);
        this.renewRemolque = false;
        var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
 
        this.toastr.success(data["mensaje"] , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      },err=>{
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

  asignarConductor(data:any ,idViaje:number){
    if(data !=""){
      var conductor:Conductor = data;
      var asignarConductor = new AsignarConductor(idViaje, conductor);
      this.viajeService.asignarConductor(asignarConductor).subscribe(
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

  }

  updateConductor(idViaje:number){
    this.viajeService.updateConductor(idViaje).subscribe(
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
      },err=>{
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
}
