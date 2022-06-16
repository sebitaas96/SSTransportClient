import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Notificacion } from 'src/app/models/notificacion';
import { Provincia } from 'src/app/models/provincia';
import { Transporte } from 'src/app/models/transporte';
import { Usuario } from 'src/app/models/usuario';
import { Viaje } from 'src/app/models/viaje';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
declare var $:any;
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { PagoService } from 'src/app/services/pago.service';
import { Pago } from 'src/app/models/pago';
import { GravedadService } from 'src/app/services/gravedad.service';
import { ToastrService } from 'ngx-toastr';
import { NuevaNotificacion } from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart")chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>|any;

  isLogged:boolean;
  nombreEmpresaUsuario!:string;
  usuario!:Usuario;
  errMsj!:string;
  datosSinCompletar!:boolean;
  cuentaSinCompletar!:boolean;
  ahora = new Date();

  //Rol
  isPorte!:boolean;
  isConductor!:boolean;
  isExpedidor!:boolean;
  isTransporte!:boolean;

  //Notificaciones
  notificaciones$!:Observable<Notificacion[]>;
  refreshNotificaciones$ = new BehaviorSubject<boolean>(true);

  //Pagos 
  pagos$!:Pago[];
  pagosP$!:Observable<Pago[]>;
  refreshPagosP$ = new BehaviorSubject<boolean>(true);
  pagosEnero:number=0;
  pagosFebrero:number=0;
  pagosMarzo:number=0;
  pagosAbril:number=0;
  pagosMayo:number=0;
  pagosJunio:number=0;

  //Viajes
  allViajes$!:Viaje[];
  viajes$!:Viaje[];
  viajesExpedidos:number =0;
  viajesReservados:number=0;
  viajesTransito:number=0;
  viajesCaducado:number =0;
  viajesFinalizados:number=0;
  viajesBarcelona:number = 0;
  viajesMadrid:number =0;
  viajesOperador:number =0;
  OperadorDeProvincia!:string|any;

  //Notificaciones
  gravedad$!:Gravedad[];
  usuario$!:Usuario;

  constructor(private tokenService:TokenService,
    private usuarioService:UsuarioService,
    private viajeService:ViajeService,
    private notificacionService:NotificacionService,
    private pagoService:PagoService,
   private gravedadService:GravedadService,
    private toastr: ToastrService,
    ) {
    this.isLogged = false;

   }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.nombreEmpresaUsuario = this.tokenService.getUserName();
    this.gravedadService.findAll().subscribe(
      data=>{
        this.gravedad$ = data;
      }
    )

    this.usuarioService.findUsuario(this.nombreEmpresaUsuario).subscribe(data=>{
      this.usuario = data;
      this.usuario$ = data;
      console.log(this.usuario);

      if(this.usuario.residenteDeDireccion ===null ||this.usuario.cuentaBancaria ===null){
        if(this.usuario.residenteDeDireccion ===null && this.usuario.cuentaBancaria ===null){
          this.errMsj = "Acciones requeridas"
          $('#errorModal').modal("show");

          this.datosSinCompletar = true;
          this.cuentaSinCompletar = true;
        }
        else{
          this.datosSinCompletar = false;
          this.cuentaSinCompletar = false;
          this.errMsj = "Accion requerida"
          if(this.usuario.residenteDeDireccion ===null){
            this.datosSinCompletar = true;
          }
          else if(this.usuario.cuentaBancaria ===null){
            this.cuentaSinCompletar = true;
          }
          $('#errorModal').modal("show");
        }
      }
      else{
        this.OperadorDeProvincia = this.usuario.operadorDeProvincia?.nombre;
        this.viajeService.findAllPanel().subscribe(
          data=>{
            this.allViajes$ = data;
            this.configurePanelCarga(this.allViajes$);

          }
        )

        this.notificaciones$ = this.refreshNotificaciones$.pipe(switchMap(_=>this.notificacionService.findAllUsuario(this.usuario.id)));

        if(this.tokenService.getIsTransporte()){
          this.isTransporte = true;
            this.viajeService.findAllTransporte(data["id"]).subscribe(
            data=>{
              this.viajes$ = data;
              this.contarViajes(this.viajes$); 
            }
          );

          this.pagoService.findAllTransporte(data["id"]).subscribe(
            data=>{
              this.pagos$ = data;
              this.AddGrafica(this.pagos$);
            }
          )
        }
       else if(this.tokenService.getIsPorte()){
        this.isPorte = true;
        this.viajeService.findAll(data["id"]).subscribe(
          data=>{
            this.viajes$ = data;
            this.contarViajes(this.viajes$);
          }

        );
        this.pagosP$= this.refreshPagosP$.pipe(switchMap(_=> this.pagoService.findAllPorte(data["id"])));
        this.pagoService.findAllPorte(data["id"]).subscribe(
          data=>{
            this.pagos$ = data;
            this.AddGrafica(this.pagos$);
          }
        )
        }
       else if(this.tokenService.getIsExpedidor()){
        this.isExpedidor = true;
        this.viajeService.findAllExpedidor(data["id"]).subscribe(
          data=>{
            this.viajes$ = data;
            this.contarViajes(this.viajes$);
          }
        );
        }
        else if(this.tokenService.getIsConductor()){
          this.isConductor = true;
          this.viajeService.findAllConductor(data["id"]).subscribe(
            data=>{
              this.viajes$ = data;
              this.contarViajes(this.viajes$);
            }
          );
        }
      }

    });
  }

  contarViajes(viajes:Viaje[]){
    var fecha = new Date();

    for(var viaje of viajes){
      var fechaFin = new Date(viaje.fHoraFin);
      if(viaje.viajeDeEstado.nombre == "Reservado" && 
      fechaFin.getMonth() == fecha.getMonth() &&
      fechaFin.getFullYear() == fecha.getFullYear()
      ){
        this.viajesReservados++;
      }
      else if(viaje.viajeDeEstado.nombre == "Transito"&& 
      fechaFin.getMonth() == fecha.getMonth() &&
      fechaFin.getFullYear() == fecha.getFullYear()){
        this.viajesTransito++;
      }
      else if(viaje.viajeDeEstado.nombre =="Finalizado"&& 
      fechaFin.getMonth() == fecha.getMonth() &&
     fechaFin.getFullYear() == fecha.getFullYear()){
        this.viajesFinalizados++;
      }
      else if(viaje.viajeDeEstado.nombre =="Expedido"&& 
      fechaFin.getMonth() == fecha.getMonth() &&
     fechaFin.getFullYear() == fecha.getFullYear()){
        this.viajesExpedidos++;
      }
      else if(viaje.viajeDeEstado.nombre =="Caducado"&& 
      fechaFin.getMonth() == fecha.getMonth() &&
     fechaFin.getFullYear() == fecha.getFullYear()){
        this.viajesCaducado++;
      }
    }
  }

  configurePanelCarga(viajes:Viaje[]){
    var fecha = new Date();

    for(var viaje of viajes){
      var fechaFin = new Date(viaje.fHoraFin);
      if(viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.nombre== "Barcelona" && 
      fechaFin.getMonth() == fecha.getMonth() &&
      fechaFin.getFullYear() == fecha.getFullYear()
      ){
        this.viajesBarcelona++;
      }
      else if(viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.nombre == "Madrid"&& 
      fechaFin.getMonth() == fecha.getMonth() &&
      fechaFin.getFullYear() == fecha.getFullYear()){
        this.viajesMadrid++;
      }
      else if(viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.nombre ==this.OperadorDeProvincia && 
      fechaFin.getMonth() == fecha.getMonth() &&
     fechaFin.getFullYear() == fecha.getFullYear()){
        this.viajesOperador++;
      }
    }
  }


  AddGrafica(pagos:Pago[]){

    this.chartOptions = {
      series: [
        {
          name: "€",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar",
      },
      title: {
        text: "Pagos"
      },
      xaxis: {
        categories: ["Jan", "Feb",  "Mar",  "Apr",  "May",  "Jun"],
        tickPlacement: 'on'
      }
    };

    for(var pago of pagos){
    if(pago.fPago!=null){
      var fecha = new Date(pago.fPago);
      if(fecha.getMonth()+1 == 1){
        this.pagosEnero += pago.importe;
      }
      else if(fecha.getMonth()+1 == 2){
        this.pagosFebrero += pago.importe;
      }
      else if(fecha.getMonth()+1 == 3){
        this.pagosMarzo += pago.importe;
      }
      else if(fecha.getMonth()+1 == 4){
        this.pagosAbril += pago.importe;
      }
      else if(fecha.getMonth()+1 == 5){
        this.pagosMayo += pago.importe;
      }
      else if(fecha.getMonth()+1 == 6){
        this.pagosJunio += pago.importe;
      }
    }
     
    }
    
    this.chartOptions.series[0].data = [this.pagosEnero.toFixed() , this.pagosFebrero.toFixed() , this.pagosMarzo.toFixed() , this.pagosAbril.toFixed() , this.pagosMayo.toFixed(),
    this.pagosJunio.toFixed()]
   
  }

  eliminarNotificacion(idNotificacion:number){
    this.notificacionService.deleteNotificacion(idNotificacion).subscribe(
      data=>{
        this.refreshNotificaciones$.next(true);
      }
    );
  }

  RealizarPago(idPago:number){
    this.pagoService.realizarPago(idPago).subscribe(
      data=>{
        this.refreshPagosP$.next(true);
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
  RechazarPago(idPago:number){
    this.pagoService.rechazarPago(idPago).subscribe(
      data=>{
        this.refreshPagosP$.next(true);
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
