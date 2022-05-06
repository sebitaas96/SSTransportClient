import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from '../../../models/direccion';
import { Localidad } from '../../../models/localidad';
import { Pais } from '../../../models/pais';
import { Provincia } from '../../../models/provincia';
import { Rol } from '../../../models/rol';
import { PaisService } from '../../../services/pais.service';
import { ProvinciaService } from '../../../services/provincia.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  /*Declaramos los datos que traemos para rellenar selects*/
  roles:Rol[];
  paises:Pais[];
  provincias:Provincia[];
  localidades:Localidad[];
  cp:string;
  nombreUsuarioModal:string;
  passwordNoCoinciden:boolean;
  blurRealizado:boolean;

  isLogged = false;
  errMsj:string;




  constructor(
    private route:ActivatedRoute , 
    private router:Router,
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
    private tokenService:TokenService,
    private authService:AuthService
  ) {
    /*Inicializamos los selects*/
    this.roles = [];
    this.paises = [];
    this.provincias = [];
    this.localidades = [];
    
    this.errMsj = "";
    this.cp = "";
    this.nombreUsuarioModal="";
    this.passwordNoCoinciden = false;
    this.blurRealizado = false;
  }





  ngOnInit(): void {
    this.tokenService.logOut();
    //Iniciamos los paises
    this.paisService.findAll().subscribe(data=>{
      this.paises = data;
    })
  }

  onSubmit(data:any):void{
    let usuario:Usuario = new Usuario(0, data['nombre'] ,data['nombreUsuario'],data['password'],data['documento'] , data['email'] , data['prefijo']+data['phone'], 
    null,
    null,
    null
    )
    if(data['nombreUsuario']!=""){
      this.nombreUsuarioModal = data['nombreUsuario']
    }
    console.log(usuario);

    if(data['tipoEmpresa'] === "transporte"){
      this.authService.nuevoTransporte(usuario).subscribe(
        data => {
          $('#successModal').modal("show");
          
        },
        err => {
          this.errMsj = err['error']['mensaje'];
          $('#errorModal').modal("show");
        }
      );
    }
    else if(data['tipoEmpresa'] === "porte"){
      this.authService.nuevoPorte(usuario).subscribe(
        data => {
          $('#successModal').modal("show");
          
        },
        err => {
          this.errMsj = err['error']['mensaje'];
          $('#errorModal').modal("show");
        }
      );
    }
    else{
      this.errMsj ="Tipo de empresa desconocido";
      $('#errorModal').modal("show");
    }
    
  }


 
/*Renew de los selects*/
  renewProvincias(pais:any){
    if(pais != ""){
      this.paisService.findProvincias(pais.id).subscribe(data=>{
        this.provincias = data;
        if(this.provincias.length>0){
          this.renewLocalidades(data[0]);
        }
        else{
          this.localidades = [];
        }
      })
    }
    else{
      this.provincias = [];
      this.localidades = [];
    }
  }

  renewLocalidades(provincia:any){
    if(provincia !=""){
      this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
        this.localidades = data;
      });
    }
    else{
      this.localidades = [];
    }

  }

  renewCp(localidad:any){
    this.cp = localidad.cp;
  }

  comprobarPassword(data:any){
    if(data["passwordr"]==""){
      this.blurRealizado = true;
      this.passwordNoCoinciden = false;
    }
    else if(data["password"] != data["passwordr"]){
      this.passwordNoCoinciden = true;
      this.blurRealizado = false;
    }  
    else if(data["password"] == data["passwordr"]){
      this.blurRealizado = false;
      this.passwordNoCoinciden = false;
    }
  }


}
