import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbNavConfig, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Pago } from 'src/app/models/pago';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { PagoService } from 'src/app/services/pago.service';
import { data } from 'jquery';
import { EstadopagoService } from 'src/app/services/estadoPago.service';
import { EstadoPago } from 'src/app/models/estadoPago';
import {PagosEstado } from 'src/app/dto/pagosEstado';
import { Viaje } from 'src/app/models/viaje';
import { ViajeService } from 'src/app/services/viaje.service';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/Email';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService} from 'src/app/services/notificacion.service'; 
import { GravedadService} from 'src/app/services/gravedad.service'; 
import {NuevaNotificacion} from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
import { Usuario } from 'src/app/models/usuario';
const FILTER_PAG_REGEX = /[^0-9]/g;
declare var $:any;
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {

  active = 1;
  closeResult = '';
  page = 1;
  filterTerm!: string;
  pagos$!:Observable<Pago[]>;
  refreshPagos$ = new BehaviorSubject<boolean>(true);
  nombreEmpresaUsuario:string;
  isPorte:boolean;

  enviando:boolean;
  enviadoCorrectamente:boolean;
  enviadoFail:boolean;
  errMsj:string;

  estadosPago$!:Observable<EstadoPago[]>
  empresaId:number;

  emailAdministrador = "onussarasebas@gmail.com"
  nombreEmpresaPortadora:string;
  emailPorte!:string;
  comentario!:string;
  Pago!:Pago;
  Viaje!:Viaje;

  //Notificaciones
  gravedad$!:Gravedad[];
  usuario$!:Usuario;

  constructor(
    private modalService: NgbModal,
    private tokenService:TokenService,
    private usuarioService:UsuarioService,
    private pagosService:PagoService,
    private estadoPagoService:EstadopagoService,
    private viajeService:ViajeService,
    private mensajeService:EmailService
    ,  private gravedadService:GravedadService,
    private notificacionService:NotificacionService,
    private toastr: ToastrService,
  ) { 
    this.nombreEmpresaUsuario = "";

    this.enviando = false;
    this.enviadoCorrectamente = false;
    this.enviadoFail = false;
    this.errMsj ="";
    this.isPorte = false;
    this.empresaId = 0;
    this.nombreEmpresaUsuario = "";
    this.nombreEmpresaPortadora = "";
  }

  ngOnInit(): void {
    if(this.tokenService.getIsPorte()){
      this.isPorte = true;
      this.usuarioService.findEmpresaPorteNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.usuario$ = data;
              this.pagos$= this.refreshPagos$.pipe(switchMap(_=> this.pagosService.findAllPorte(data["id"])));
              this.empresaId = data["id"];
            
        }
      )
    }

    if(this.tokenService.getIsTransporte()){
      this.usuarioService.findEmpresaTransprte(this.tokenService.getUserName()).subscribe(
        data=>{
          this.usuario$ = data;
              this.pagos$= this.refreshPagos$.pipe(switchMap(_=> this.pagosService.findAllTransporte(data["id"])));
              this.empresaId = data["id"];
              this.nombreEmpresaUsuario = data["nombre"];
        }
      )
    }

    this.gravedadService.findAll().subscribe(
      data=>{
        this.gravedad$ = data;
      }
    )

    this.estadosPago$ = this.estadoPagoService.findAll();
    
  }

    //Funciones para bootstrap , buscadores y paginadores

    open(content:any , idPago:number) {
    
      this.pagosService.findPago(idPago).subscribe(
        data=>{
          this.Pago = data;
          console.log(this.Pago.id);
          this.emailPorte = this.Pago.pagoDePorte.email;
          this.nombreEmpresaPortadora = this.Pago.pagoDePorte.nombre;
          this.viajeService.findViajeIdPago(this.Pago.id).subscribe(
            data=>{
              console.log(data);
              this.Viaje = data;
              //Comentario
              this.comentario = "Se le reclama a la empresa con nombre  " +this.nombreEmpresaPortadora+" y CIF/NIF  "+ 
              this.Pago.pagoDePorte.documento+ " el importe de "+ this.Pago.importe 
          + "€ relacionado a un viaje realizado entre las fechas ("+this.Viaje.fHoraInicio+"-"+this.Viaje.fHoraFin+")"
          +"y una ruta realizada desde "+this.Viaje.recogidaDeDireccion.direccionDeLocalidad.nombre+", "
          +this.Viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.nombre + " ===>> "
          +this.Viaje.entregaDeDireccion.direccionDeLocalidad.nombre+", "
          +this.Viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.nombre;
          //
          $("#comentario").text(this.comentario);
          console.log(this.comentario);
            }
          )

        }
      )

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
  
    selectPage(page: string) {
      this.page = parseInt(page, 10) || 1;
    }
  
    formatInput(input: HTMLInputElement) {
      input.value = input.value.replace(FILTER_PAG_REGEX, '');
    }

    RealizarPago(idPago:number){
      this.pagosService.realizarPago(idPago).subscribe(
        data=>{
          this.refreshPagos$.next(true);
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
      this.pagosService.rechazarPago(idPago).subscribe(
        data=>{
          this.refreshPagos$.next(true);
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

    DisputarPago(data:any){
     /* console.log(data);
      console.log();
   //Inicializamos spinner y variables de envios
   this.enviando = true;
   this.enviadoCorrectamente = false;
   this.enviadoFail = false;

   let email:Email = new Email(0,data['correo'] , data['asunto'] , this.comentario ,"", null,null);
*/
      this.pagosService.disputarPago(this.Pago.id).subscribe(
        data=>{
          this.refreshPagos$.next(true);
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

    filtrarEstado(data:any){
      if(data !=null){
        console.log(data);
        var pagosEstado = new PagosEstado(this.empresaId,data["nombre"])
        this.pagos$= this.refreshPagos$.pipe(switchMap(_=> this.pagosService.findAllFiltrado(pagosEstado)));
        this.refreshPagos$.next(true);
      }
      else{
        if(this.tokenService.getIsPorte()){
          this.pagos$= this.refreshPagos$.pipe(switchMap(_=> this.pagosService.findAllPorte(this.empresaId)));
          this.refreshPagos$.next(true);
        }
        else if(this.tokenService.getIsTransporte()){
          this.pagos$= this.refreshPagos$.pipe(switchMap(_=> this.pagosService.findAllTransporte(this.empresaId)));
          this.refreshPagos$.next(true);
        }
      }

    }



}
