
import {Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Email } from 'src/app/models/mensaje';
import { EmailService } from 'src/app/services/email.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {
  active = 1;
  closeResult = '';
  empresa:string;
  correo :string;
  enviadoCorrectamente:boolean;
  enviadoFail:boolean;
  errMsj:string;


  constructor(private modalService: NgbModal,private tokenService:TokenService , private mensajeService:EmailService , private usuarioService:UsuarioService) {
    this.empresa="";
    this.correo = "";
    this.enviadoCorrectamente = false;
    this.enviadoFail = false;
    this.errMsj = "";
  }

  ngOnInit(): void {
    this.empresa = this.tokenService.getUserName();
    console.log(this.empresa);
  }

  onSubmit(dataMensaje:any):void{
    this.usuarioService.findEmpresaTransprte(this.empresa).subscribe(
      data=>{
        var url = environment.registroConductor+"?q="+data["id"]+"&e="+dataMensaje["correo"];
        var texto = dataMensaje['empresa']+" Te ha invitado a colaborar en Onus : ["+dataMensaje['comentario']+"] Date de alta aquí : ";
        let email:Email = new Email(dataMensaje['correo'] , dataMensaje['asunto'] , texto ,url, data);
    
        if(dataMensaje['correo']!=""){
          this.correo = dataMensaje['correo']
        }
    
        console.log(email);
        
        this.mensajeService.sendMenssage(email).subscribe(
          data => {
            this.enviadoCorrectamente = true;
            this.enviadoFail = false;
            this.errMsj = data["mensaje"];
          },
          err => {
            this.enviadoFail = true;
            this.enviadoCorrectamente = false;
            this.errMsj = err['error']['mensaje'];
          }
        )
      }
    )
  }

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




}
