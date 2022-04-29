import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-onus',
  templateUrl: './onus.component.html',
  styleUrls:[
    '../../../assets/css/onusStyle.css'
  ],
  encapsulation: ViewEncapsulation.None, 
})
export class OnusComponent implements OnInit {

    //TipoUsuario
    isConductor:boolean;
    isTransporte:boolean;
    isPorte:boolean;
    isExpedidor:boolean;
    //
    nombreUsuario:string;
    isLogged:boolean;
    usuario!:Usuario;
    datosSinCompletar!:boolean;
    cuentaSinCompletar!:boolean;

  constructor(private tokenService:TokenService, private router:Router,
    private usuarioService:UsuarioService) { 
    this.nombreUsuario = "";
    this.isLogged = false;
    this.isConductor = false;
    this.isTransporte = false;
    this.isPorte = false;
    this.isExpedidor = false;
  }

  ngOnInit(): void {

    this.nombreUsuario = this.tokenService.getUserName();
    if(this.tokenService.getIsTransporte()){
      this.isTransporte = true;
    }
    else if(this.tokenService.getIsConductor()){
      this.isConductor = true;
    }
    else if(this.tokenService.getIsPorte()){
      this.isPorte = true;
    }
    else if(this.tokenService.getIsExpedidor()){
      this.isExpedidor = true;
    }

    this.isLogged = true;
    this.usuarioService.findUsuario(this.nombreUsuario).subscribe(data=>{
      this.usuario = data;
      console.log(this.usuario);

      if(this.usuario.residenteDeDireccion ===null ||this.usuario.cuentaBancaria ===null){
        if(this.usuario.residenteDeDireccion ===null && this.usuario.cuentaBancaria ===null){
          this.datosSinCompletar = true;
          this.cuentaSinCompletar = true;
        }
        else{
          if(this.usuario.residenteDeDireccion ===null){
            this.datosSinCompletar = true;
          }
          else if(this.usuario.cuentaBancaria ===null){
            this.cuentaSinCompletar = true;
          }
        }
      }
    });
}

logOut(){
  this.tokenService.logOut();
  this.router.navigate(['/ptprincipal']);
}

}
