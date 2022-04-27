
import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
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
import { CambiarEstadoConductor } from 'src/app/dto/cambiarEstadoConductor';
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
      this.empresa = data;
      this.emails$ = this.refreshEmails$.pipe(switchMap(_=>this.mensajeService.findAllEmails(this.empresa.id)));
      this.conductores$ = this.refreshConductores$.pipe(switchMap(_=>this.usuarioService.findAllConductores(this.empresa.id)));
    });
 

  }

  onSubmit(dataMensaje:any):void{
        //Inicializamos spinner y variables de envios
        this.enviando = true;
        this.enviadoCorrectamente = false;
        this.enviadoFail = false;

        var url = environment.registroConductor+"?q="+this.empresa["id"]+"&e="+dataMensaje["correo"];
        var texto = dataMensaje['empresa']+" Te ha invitado a colaborar en Onus : ["+dataMensaje['comentario']+"] Date de alta aquí : ";
        let email:Email = new Email(0,dataMensaje['correo'] , dataMensaje['asunto'] , texto ,url, this.empresa);
    
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

  eliminarConductor(idConductor:number){
    this.conductorEeliminadoC = false;
    this.conductorElminadoF = false;
    this.eliminandoConductor = true;
    this.usuarioService.deleteConductor(idConductor).subscribe(
      data=>{
        this.conductorEeliminadoC = true;
        this.eliminandoConductor = false;
        this.errMsjEC = data["mensaje"];
        this.refreshConductores$.next(true);
      },
      err=>{
        this.eliminandoConductor = false;
        this.conductorElminadoF = true;
        this.errMsjEC = err['error']['mensaje'];
      }

    )
  }


  cambiarEstado(estado:boolean , idConductor:number){
    var cambioEstado:CambiarEstadoConductor = new CambiarEstadoConductor(estado , idConductor);
    this.usuarioService.updateEstadoConductor(cambioEstado).subscribe(
      data=>{
        this.estadoConductorCambiado = true;
        this.estadoConductorNoCambiado = false;
        this.errMsjEC = data["mensaje"];
        this.refreshConductores$.next(true);
      },
      err=>{
        this.estadoConductorCambiado = false;
        this.estadoConductorNoCambiado = true;
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
