import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from '../../models/direccion';
import { Localidad } from '../../models/localidad';
import { Pais } from '../../models/pais';
import { Provincia } from '../../models/provincia';
import { Rol } from '../../models/rol';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { Conductor } from 'src/app/models/conductor';
import { Transporte } from 'src/app/models/transporte';
import { EmailService } from 'src/app/services/email.service';
declare var $:any;


@Component({
  selector: 'singup-conductor',
  templateUrl: './singup-conductor.component.html',
  styleUrls: ['./singup-conductor.component.css']
})
export class SingupConductorComponent implements OnInit {

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
 empresa:Transporte;
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
   this.empresa = new Transporte(0,"","","","","","",new Direccion(0,"","",0,new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")))),new Provincia(0,"",new Pais(0,"")),null);
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
        this.nombreEmpresa = data["invitacionDeTransporte"]["nombre"];
        this.email = data["destinatario"];
        this.empresa = data["invitacionDeTransporte"];
        this.idEmail = data["id"];
        console.log(this.idEmail);
      }
    },
  );
  
 }

 onSubmit(data:any):void{
   let usuario:Usuario = new Conductor(0, data['nombre'] ,data['apellidos'] ,data['nombreUsuario'],data['password'],data['documento'] , data['email'] , data['prefijo']+data['phone'], this.empresa,
   new Direccion(0, data['direccionvia'] , data['direccion'] , Number(data['direccionnumero']) , data['localidad']),
   data['provincia'],
   null
   )
   if(data['nombreUsuario']!=""){
     this.nombreUsuarioModal = data['nombreUsuario']
   }
   console.log(usuario);

   this.authService.nuevoConductor(usuario).subscribe(
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
