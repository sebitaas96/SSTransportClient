import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CambiarEstado } from 'src/app/dto/cambiarEstado';
import { Email } from 'src/app/models/Email';
import { Expedidor } from 'src/app/models/expedidor';
import { Porte } from 'src/app/models/porte';
import { EmailService } from 'src/app/services/email.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService} from 'src/app/services/notificacion.service'; 
import { GravedadService} from 'src/app/services/gravedad.service'; 
import {NuevaNotificacion} from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
import { Usuario } from 'src/app/models/usuario';
const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: 'app-expedidores',
  templateUrl: './expedidores.component.html',
  styleUrls: ['./expedidores.component.css']
})
export class ExpedidoresComponent implements OnInit {

  active = 1;
  closeResult = '';
  page = 1;
  filterTerm!: string;
  ///DATOS
  nombreEmpresaUsuario:string;
  correo :string;
  //ENVIAR INVITACION
  enviando:boolean;
  enviadoCorrectamente:boolean;
  enviadoFail:boolean;

  //ELIMINAR INVITACION
  eliminando:boolean;
  emailEliminadoC:boolean;
  emailEliminadoF:boolean;
  //Eliminar Conductor
  eliminandoExpedidor:boolean;
  expedidorEeliminadoC:boolean;
  expedidorElminadoF:boolean;

  //Estado conductor
  estadoExpedidorCambiado:boolean;
  estadoExpedidorNoCambiado:boolean;

  errMsj:string;
  errMsjD:string;
  errMsjC:string;
  errMsjEC:string;
  empresa!:Porte;
  //EMAILS
  emails$!: Observable<Email[]>;
  refreshEmails$ = new BehaviorSubject<boolean>(true);
  //Conductores
  expedidores$!:Observable<Expedidor[]>;
  refreshExpedidores$ = new BehaviorSubject<boolean>(true);

  //Notificaciones
  gravedad$!:Gravedad[];
  usuario$!:Usuario;


  constructor(private modalService: NgbModal
    ,private tokenService:TokenService 
    , private mensajeService:EmailService 
    , private usuarioService:UsuarioService
    ,  private gravedadService:GravedadService,
    private notificacionService:NotificacionService,
    private toastr: ToastrService
    ) {
    
    
    this.nombreEmpresaUsuario="";
    this.correo = "";
    this.enviando = false;
    this.enviadoCorrectamente = false;
    this.enviadoFail = false;
    this.eliminando = false;
    this.emailEliminadoC = false;
    this.emailEliminadoF = false;
    this.eliminandoExpedidor = false;
    this.expedidorEeliminadoC = false;
    this.expedidorElminadoF = false;
    this.estadoExpedidorCambiado = false;
    this.estadoExpedidorNoCambiado = false;
    this.errMsj = "";
    this.errMsjD = "";
    this.errMsjC = ""; 
    this.errMsjEC = ""; 
  }

  ngOnInit(): void {
    this.nombreEmpresaUsuario = this.tokenService.getUserName();
    this.usuarioService.findEmpresaPorteNombre(this.nombreEmpresaUsuario).subscribe(data=>{
      this.empresa = data;
      this.usuario$ = data;
      this.emails$ = this.refreshEmails$.pipe(switchMap(_=>this.mensajeService.findAllEmailsPorte(this.empresa.id)));
      this.expedidores$ = this.refreshExpedidores$.pipe(switchMap(_=>this.usuarioService.findAllExpedidores(this.empresa.id)));
    });
    this.gravedadService.findAll().subscribe(
      data=>{
        this.gravedad$ = data;
      }
    )

  }

  onSubmit(dataMensaje:any):void{
        //Inicializamos spinner y variables de envios
        this.enviando = true;
        this.enviadoCorrectamente = false;
        this.enviadoFail = false;

        var url = environment.registroExternos+"?q="+this.empresa["id"]+"&e="+dataMensaje["correo"]+"&t=porte";
        var texto = dataMensaje['empresa']+" Te ha invitado a colaborar en Onus : ["+dataMensaje['comentario']+"] Date de alta aquí : ";
        let email:Email = new Email(0,dataMensaje['correo'] , dataMensaje['asunto'] , texto ,url, null,this.empresa);
    
        if(dataMensaje['correo']!=""){
          this.correo = dataMensaje['correo']
        }
    
        console.log(email);
        
        this.mensajeService.sendMenssage(email).subscribe(
          data => {
            this.enviando = false;
            this.refreshEmails$.next(true);
            var notificacion = new NuevaNotificacion(data["mensaje"] , new Date(),this.usuario$.id, this.gravedad$[1].id);
            this.notificacionService.addNotificacion(notificacion).subscribe();
    
            this.toastr.success(data["mensaje"] , 'Notificación',{
              progressBar:true,
              timeOut: 3000,
              easing:'ease-in',
              easeTime:300
            });
          },
          err => {
            this.enviando = false;
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

  eliminarInvitacion(emailId:number){
    this.emailEliminadoC = false;
    this.emailEliminadoF = false;
    this.eliminando = true;
    this.mensajeService.deleteEmail(emailId).subscribe(
      data=>{
        this.eliminando = false;
        this.refreshEmails$.next(true);
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
      this.eliminando = false;
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

  eliminarExpedidor(idExpedidor:number){
    this.expedidorEeliminadoC = false;
    this.expedidorElminadoF = false;
    this.eliminandoExpedidor = true;
    this.usuarioService.deleteExpedidor(idExpedidor).subscribe(
      data=>{
        this.refreshExpedidores$.next(true);
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


  cambiarEstado(estado:boolean , idExpedidor:number){
    var cambioEstado:CambiarEstado = new CambiarEstado(estado , idExpedidor);
    this.usuarioService.updateEstadoExpedidor(cambioEstado).subscribe(
      data=>{
        this.refreshExpedidores$.next(true);
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


  //Funciones para bootstrap , buscadores y paginadores

  open(content:any) {
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



}
