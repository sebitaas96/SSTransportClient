import { Component, OnInit } from '@angular/core';
import { Transporte } from 'src/app/models/transporte';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var $:any;
@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLogged:boolean;
  nombreEmpresaUsuario!:string;
  usuario!:Usuario;
  errMsj!:string;
  datosSinCompletar!:boolean;
  cuentaSinCompletar!:boolean;

  constructor(private tokenService:TokenService,private usuarioService:UsuarioService) {
    this.isLogged = false;
   }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.nombreEmpresaUsuario = this.tokenService.getUserName();
    this.usuarioService.findUsuario(this.nombreEmpresaUsuario).subscribe(data=>{
      this.usuario = data;
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
    });
  }

}
