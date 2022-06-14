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
import { Conductor } from 'src/app/models/conductor';
import { Transporte } from 'src/app/models/transporte';
import { EmailService } from 'src/app/services/email.service';
import { Porte } from 'src/app/models/porte';
import { Expedidor } from 'src/app/models/expedidor';
declare var $:any;


@Component({
  selector: 'singup-externos',
  templateUrl: './singup-externos.component.html',
  styleUrls: ['./singup-externos.component.css']
})
export class SingupExternosComponent implements OnInit {

 /*Declaramos los datos que traemos para rellenar selects*/
 roles:Rol[];
 paises:Pais[];
 provincias:Provincia[];
 localidades:Localidad[];
 cp:string;
 nombreUsuarioModal:string;

 isLogged = false;
 errMsj:string;
 mensajeOfuscado:string;
 nombreEmpresa:string;
 empresaTransporte:Transporte;
 empresaPorte:Porte;
 email:string;
 idEmail:number;




 constructor(
   private route:ActivatedRoute , 
   private router:Router,
   private paisService:PaisService,
   private provinciaService:ProvinciaService,
   private tokenService:TokenService,
   private authService:AuthService,
   private mensajeService:EmailService
 ) {
   /*Inicializamos los selects*/
   this.roles = [];
   this.paises = [];
   this.provincias = [];
   this.localidades = [];
   
   this.errMsj = "";
   this.cp = "";
   this.nombreUsuarioModal="";
   this.mensajeOfuscado = "";
   this.nombreEmpresa="";
   this.empresaTransporte = new Transporte(0,"","","","","","",true,new Direccion(0,"","",0,new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")))),new Provincia(0,"",new Pais(0,"")),null);
   this.empresaPorte = new Porte(0,"","","","","","",true,new Direccion(0,"","",0,new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")))),new Provincia(0,"",new Pais(0,"")),null);
   this.email = "";
   this.idEmail = 0;
 }





  ngOnInit(): void {
   this.tokenService.logOut();
   //Iniciamos los paises
   this.paisService.findAll().subscribe(data=>{
     this.paises = data;
   })


   this.route.queryParams
   .subscribe(params => {
     this.mensajeOfuscado = params['q'];
   });



   this.mensajeService.deOfuscarMensaje(this.mensajeOfuscado).subscribe(
    data=>{
      if(data===null){
        this.errMsj = "Lo sentimos tu invitación ha caducado";
        $('#errorModal').modal("show");
      }
      else{
    
        if(data["invitacionDeTransporte"] != null){
          this.nombreEmpresa = data["invitacionDeTransporte"]!["nombre"];
          this.empresaTransporte = data["invitacionDeTransporte"]!;
        }
        else{
          this.nombreEmpresa = data["invitacionDePorte"]!["nombre"];
          this.empresaPorte = data["invitacionDePorte"]!;
        }

        this.email = data["destinatario"];
        this.idEmail = data["id"];
        console.log(this.idEmail);
      }
    },
  );
  
 }

 onSubmit(data:any):void{
   var usuario:Usuario;
   var instruccion;
   console.log(data);
   if(this.empresaTransporte.id !=0){
    usuario = new Conductor(0, data['nombre'] ,data['apellidos'] ,data['nombreUsuario'],data['password'],data['documento'] , data['email'] , data['prefijo']+data['phone'], false ,this.empresaTransporte,
    null,
    null,
    null
    );
    instruccion = this.authService.nuevoConductor(usuario);
   }
   else{
    usuario = new Expedidor(0, data['nombre'] ,data['apellidos'] ,data['nombreUsuario'],data['password'],data['documento'] , data['email'] , data['prefijo']+data['phone'], false ,this.empresaPorte,
    null,
    null,
    null
    );
    instruccion = this.authService.nuevoExpedidor(usuario);
   }
 
   if(data['nombreUsuario']!=""){
     this.nombreUsuarioModal = data['nombreUsuario']
   }
   console.log(usuario);

   instruccion.subscribe(
     data => {
       $('#successModal').modal("show");
       console.log(this.idEmail);
       this.mensajeService.deleteEmail(this.idEmail).subscribe();
     },
     err => {
       this.errMsj = err['error']['mensaje'];
       $('#errorModal').modal("show");
     }
   );
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


}
