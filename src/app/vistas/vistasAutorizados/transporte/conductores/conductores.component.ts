
import {Component, OnDestroy, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Email } from 'src/app/models/Email';
import { Transporte } from 'src/app/models/transporte';
import { EmailService } from 'src/app/services/email.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { data } from 'jquery';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Conductor } from 'src/app/models/conductor';
import { CambiarEstado } from 'src/app/dto/cambiarEstado';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService} from 'src/app/services/notificacion.service'; 
import { GravedadService} from 'src/app/services/gravedad.service'; 
import {NuevaNotificacion} from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
import { Usuario } from 'src/app/models/usuario';
const FILTER_PAG_REGEX = /[^0-9]/g;
var EmpresaId = 0; 

@Component({
  selector: 'conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {
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
  eliminandoConductor:boolean;
  conductorEeliminadoC:boolean;
  conductorElminadoF:boolean;

  //Estado conductor
  estadoConductorCambiado:boolean;
  estadoConductorNoCambiado:boolean;

  errMsj:string;
  errMsjD:string;
  errMsjC:string;
  errMsjEC:string;
  empresa!:Transporte;
  //EMAILS
  emails$!: Observable<Email[]>;
  refreshEmails$ = new BehaviorSubject<boolean>(true);
  //Conductores
  conductores$!:Observable<Conductor[]>;
  refreshConductores$ = new BehaviorSubject<boolean>(true);

    //Notificaciones
    gravedad$!:Gravedad[];
    usuario$!:Usuario;


  constructor(private modalService: NgbModal
    ,private tokenService:TokenService 
    , private mensajeService:EmailService 
    , private usuarioService:UsuarioService
    ,  private gravedadService:GravedadService,
    private notificacionService:NotificacionService,
    private toastr: ToastrService,) {
    
    
    this.nombreEmpresaUsuario="";
    this.correo = "";
    this.enviando = false;
    this.enviadoCorrectamente = false;
    this.enviadoFail = false;
    this.eliminando = false;
    this.emailEliminadoC = false;
    this.emailEliminadoF = false;
    this.eliminandoConductor = false;
    this.conductorEeliminadoC = false;
    this.conductorElminadoF = false;
    this.estadoConductorCambiado = false;
    this.estadoConductorNoCambiado = false;
    this.errMsj = "";
    this.errMsjD = "";
    this.errMsjC = ""; 
    this.errMsjEC = ""; 
  }

  ngOnInit(): void {
    this.nombreEmpresaUsuario = this.tokenService.getUserName();
    this.usuarioService.findEmpresaTransprte(this.nombreEmpresaUsuario).subscribe(data=>{
      this.usuario$ = data;
      this.empresa = data;
      this.emails$ = this.refreshEmails$.pipe(switchMap(_=>this.mensajeService.findAllEmailsTransporte(this.empresa.id)));
      this.conductores$ = this.refreshConductores$.pipe(switchMap(_=>this.usuarioService.findAllConductores(this.empresa.id)));
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

        var url = environment.registroExternos+"?q="+this.empresa["id"]+"&e="+dataMensaje["correo"]+"&t=transporte";
        var texto = dataMensaje['empresa']+" Te ha invitado a colaborar en Onus : ["+dataMensaje['comentario']+"] Date de alta aquí : ";
        let email:Email = new Email(0,dataMensaje['correo'] , dataMensaje['asunto'] , texto ,url, this.empresa , null);
    
        if(dataMensaje['correo']!=""){
          this.correo = dataMensaje['correo']
        }
    
        console.log(email);
        
        this.mensajeService.sendMenssage(email).subscribe(
          data => {
            this.enviando = false;
            this.errMsj = data["mensaje"];

            var notificacion = new NuevaNotificacion(this.errMsj  , new Date(),this.usuario$.id, this.gravedad$[1].id);
            this.notificacionService.addNotificacion(notificacion).subscribe();
    
            this.toastr.success(this.errMsj , 'Notificación',{
              progressBar:true,
              timeOut: 3000,
              easing:'ease-in',
              easeTime:300
            });
            
            this.refreshEmails$.next(true);
          },
          err => {
            this.enviando = false;
            this.errMsj = err['error']['mensaje'];
            var notificacion = new NuevaNotificacion(this.errMsj , new Date(),this.usuario$.id, this.gravedad$[2].id);
            this.notificacionService.addNotificacion(notificacion).subscribe();
            this.toastr.error(this.errMsj, 'Notificación',{
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

        this.errMsjD = data["mensaje"];

        var notificacion = new NuevaNotificacion(this.errMsjD , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success(this.errMsjD , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });

        this.refreshEmails$.next(true);
    },
    err=>{
      this.errMsjD = err['error']['mensaje'];
      var notificacion = new NuevaNotificacion( this.errMsjD , new Date(),this.usuario$.id, this.gravedad$[2].id);
      this.notificacionService.addNotificacion(notificacion).subscribe();
      this.toastr.error( this.errMsjD, 'Notificación',{
        progressBar:true,
        timeOut: 3000,
        easing:'ease-in',
        easeTime:300
      });
    }
    )
  }

  eliminarConductor(idConductor:number){
    this.conductorEeliminadoC = false;
    this.conductorElminadoF = false;
    this.eliminandoConductor = true;
    this.usuarioService.deleteConductor(idConductor).subscribe(
      data=>{

        this.errMsjEC = data["mensaje"];
        var notificacion = new NuevaNotificacion(this.errMsjEC , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success(this.errMsjEC , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
        this.refreshConductores$.next(true);
      },
      err=>{
        this.errMsjEC = err['error']['mensaje'];
        var notificacion = new NuevaNotificacion( this.errMsjEC , new Date(),this.usuario$.id, this.gravedad$[2].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
        this.toastr.error( this.errMsjEC, 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      }

    )
  }


  cambiarEstado(estado:boolean , idConductor:number){
    var cambioEstado:CambiarEstado = new CambiarEstado(estado , idConductor);
    this.usuarioService.updateEstadoConductor(cambioEstado).subscribe(
      data=>{

        this.errMsjEC = data["mensaje"];
        var notificacion = new NuevaNotificacion(this.errMsjEC , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success(this.errMsjEC , 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
        this.refreshConductores$.next(true);
      },
      err=>{
        this.errMsjEC = err['error']['mensaje'];
        var notificacion = new NuevaNotificacion( this.errMsjEC , new Date(),this.usuario$.id, this.gravedad$[2].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
        this.toastr.error( this.errMsjEC, 'Notificación',{
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
