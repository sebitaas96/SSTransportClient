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




  constructor(private modalService: NgbModal
    ,private tokenService:TokenService 
    , private mensajeService:EmailService 
    , private usuarioService:UsuarioService) {
    
    
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
      this.emails$ = this.refreshEmails$.pipe(switchMap(_=>this.mensajeService.findAllEmailsPorte(this.empresa.id)));
      this.expedidores$ = this.refreshExpedidores$.pipe(switchMap(_=>this.usuarioService.findAllExpedidores(this.empresa.id)));
    });
 

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
            this.enviadoCorrectamente = true;
            this.enviando = false;
            this.errMsj = data["mensaje"];
            this.refreshEmails$.next(true);
          },
          err => {
            this.enviadoFail = true;
            this.enviando = false;
            this.errMsj = err['error']['mensaje'];
          }
        )
  }

  eliminarInvitacion(emailId:number){
    this.emailEliminadoC = false;
    this.emailEliminadoF = false;
    this.eliminando = true;
    this.mensajeService.deleteEmail(emailId).subscribe(
      data=>{
        this.emailEliminadoC = true;
        this.eliminando = false;
        this.errMsjD = data["mensaje"];
        this.refreshEmails$.next(true);
    },
    err=>{
      this.eliminando = false;
      this.emailEliminadoF = true;
      this.errMsjD = err['error']['mensaje'];
    }
    )
  }

  eliminarExpedidor(idExpedidor:number){
    this.expedidorEeliminadoC = false;
    this.expedidorElminadoF = false;
    this.eliminandoExpedidor = true;
    this.usuarioService.deleteExpedidor(idExpedidor).subscribe(
      data=>{
        this.expedidorEeliminadoC = true;
        this.eliminandoExpedidor = false;
        this.errMsjEC = data["mensaje"];
        this.refreshExpedidores$.next(true);
      },
      err=>{
        this.eliminandoExpedidor = false;
        this.expedidorElminadoF = true;
        this.errMsjEC = err['error']['mensaje'];
      }

    )
  }


  cambiarEstado(estado:boolean , idExpedidor:number){
    var cambioEstado:CambiarEstado = new CambiarEstado(estado , idExpedidor);
    this.usuarioService.updateEstadoConductor(cambioEstado).subscribe(
      data=>{
        this.estadoExpedidorCambiado = true;
        this.estadoExpedidorNoCambiado = false;
        this.errMsjEC = data["mensaje"];
        this.refreshExpedidores$.next(true);
      },
      err=>{
        this.estadoExpedidorCambiado = false;
        this.estadoExpedidorNoCambiado = true;
        this.errMsjEC = err['error']['mensaje'];

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
