
import {Component, OnInit} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Mensaje } from 'src/app/models/mensaje';
import { MensajeService } from 'src/app/services/mensaje.service';
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


  constructor(private modalService: NgbModal,private tokenService:TokenService , private mensajeService:MensajeService , private usuarioService:UsuarioService) {
    this.empresa="";
    this.correo = ""
  }

  ngOnInit(): void {
    this.empresa = this.tokenService.getUserName();
    console.log(this.empresa);
  }

  onSubmit(dataMensaje:any):void{
    this.usuarioService.findEmpresaTransprte(this.empresa).subscribe(
      data=>{
        var texto = dataMensaje['empresa']+" Te ha invitado a colaborar en Onus : ["+dataMensaje['comentario']+"] Date de alta aquí : "+ environment.registroConductor+ '?q='+data;
        let mensaje:Mensaje = new Mensaje(dataMensaje['correo'] , dataMensaje['asunto'] , texto);
    
        if(dataMensaje['correo']!=""){
          this.correo = dataMensaje['correo']
        }
    
        console.log(mensaje);
        
        this.mensajeService.sendMenssage(mensaje).subscribe(
          data => {
            console.log("enviado");
          },
          err => {
    
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
