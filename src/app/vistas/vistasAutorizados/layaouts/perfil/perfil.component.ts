import { Component, OnInit } from '@angular/core';
import { Direccion } from 'src/app/models/direccion';
import { Localidad } from 'src/app/models/localidad';
import { Pais } from 'src/app/models/pais';
import { PaisService } from '../../../../services/pais.service';
import { Provincia } from 'src/app/models/provincia';
import { ProvinciaService } from '../../../../services/provincia.service';
import { Transporte } from 'src/app/models/transporte';
import { Usuario } from 'src/app/models/usuario';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { CambioPassword } from 'src/app/dto/cambioPassword';
import { Conductor } from 'src/app/models/conductor';
import { Porte } from 'src/app/models/porte';
import { Expedidor } from 'src/app/models/expedidor';
import { ToastrService } from 'ngx-toastr';
import { NotificacionService} from 'src/app/services/notificacion.service'; 
import { GravedadService} from 'src/app/services/gravedad.service'; 
import {NuevaNotificacion} from 'src/app/dto/nuevaNotificacion';
import { Gravedad } from 'src/app/models/gravedad';
declare var $:any;

@Component({
  selector: 'perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  active = 1;
  //PERFIL
  perfil$!:Observable<any>;
  refreshPerfil$ = new BehaviorSubject<boolean>(true);
  perfil!:Usuario;
  errMsjPerfil:string;
  perfilActualizado:boolean;
  perfilNoActualizado:boolean;
  //PASSWORD
  isCoincidente:boolean;
  errMsjPwd:string;
  pwdActualizada:boolean;
  pwdNoActualizada:boolean;

  //SELECCIONABLES
  paises$!:Observable<Pais[]>;
  refresPaises$ = new BehaviorSubject<boolean>(true);
  provincias$!:Observable<Provincia[]>;
  refresProvincias$ = new BehaviorSubject<boolean>(true);
  localidades$!:Observable<Localidad[]>;
  refresLocalidades$ = new BehaviorSubject<boolean>(true);

  paises:Pais[];
  provincias:Provincia[];
  localidades:Localidad[];
  isConductor:boolean;
  isExpedidor:boolean;

  /*Datos direccion*/
  cp!:string;
  tipoVia!:string;
  direccion!:string;
  numero!:string;
  paisO!:Pais;
  provinciaO!:Provincia;
  localidadO!:Localidad;
  prefijoO:string;
  telefonoO:string;


    //Notificaciones
    gravedad$!:Gravedad[];
    usuario$!:Usuario;

  constructor(private usuarioService: UsuarioService 
    , private tokenService:TokenService
    , private paisService:PaisService,
     private provinciaService:ProvinciaService,
     private gravedadService:GravedadService,
     private notificacionService:NotificacionService,
     private toastr: ToastrService,
     ) { 
    //password
      this.isCoincidente = false;
      this.errMsjPwd = "";
      this.pwdActualizada = false;
      this.pwdNoActualizada = false;
     //Perfil 
      this.errMsjPerfil = "";
      this.perfilActualizado = false;
      this.perfilNoActualizado = false;

    /*Inicializamos los selects*/
    this.paisO = new Pais(0,"");
    this.provinciaO = new Provincia(0,"",this.paisO);
    this.localidadO = new Localidad(0,"",0,this.provinciaO);
    this.prefijoO = "";
    this.telefonoO = "";
    this.isConductor = false;
    this.isExpedidor = false;
    this.paises = [];
    this.provincias = [];
    this.localidades = [];
  }

  ngOnInit(): void {
    if(this.tokenService.getIsConductor() ||this.tokenService.getIsExpedidor()){
      this.isConductor = true;
      this.isExpedidor = true;
    }

      this.perfil$ = this.refreshPerfil$.pipe(switchMap(_=>this.usuarioService.findUsuario(this.tokenService.getUserName())));
      this.usuarioService.findUsuario(this.tokenService.getUserName()).subscribe(data=>{
        this.usuario$ = data;
        this.perfil = data;
        this.inicializacion(this.perfil);
      })

      this.gravedadService.findAll().subscribe(
        data=>{
          this.gravedad$ = data;
        }
      )
  }

  inicializacion(perfil:any){
    this.prefijoO = perfil.telefono.substr(0,3);
    this.telefonoO = perfil.telefono.substring(3);
    if(perfil.residenteDeDireccion!=null){
      this.localidadO = perfil.residenteDeDireccion.direccionDeLocalidad;
      this.provinciaO = perfil.residenteDeDireccion.direccionDeLocalidad.localidadDeProvincia;
      this.paisO = perfil.residenteDeDireccion.direccionDeLocalidad.localidadDeProvincia.provinciaDePais;
      this.paisService.findAll().subscribe(data=>{
        this.paises = data;
      });
      this.paisService.findProvincias(this.paisO.id).subscribe(data=>{
        this.provincias = data;
      });
      this.provinciaService.findLocalidades(this.provinciaO.id).subscribe(data=>{
        this.localidades = data;
      });
      this.renewCp(this.localidadO);
    }
    else{
      this.paisService.findAll().subscribe(data=>{
        this.paises = data;
      });
    }
  }
  
  onPerfil(data:any , dataform:any):void{
    var usuario;
    var instruccion!:Observable<any>;
    if(this.perfil.residenteDeDireccion != null){
      var provincia:Provincia = new Provincia(0,"",new Pais(0,""));
      var localidad:Localidad = new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")));
      if(dataform["localidad"] == ""){
        localidad = this.localidadO;
      }
      else{
        localidad = dataform["localidad"];
      }
      if(dataform["provincia"] == ""){
        provincia = this.provinciaO;
      }
      else{
        provincia = dataform["provincia"];
      }
      if(this.tokenService.getIsTransporte()){
        usuario = new Transporte(data["id"] , data["nombre"] , data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO ,true,new Direccion(data["residenteDeDireccion"]["id"] , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],localidad) ,provincia,
        data["cuentaBancaria"]); 
        instruccion = this.usuarioService.updateTransporte(usuario);
      }
      else if(this.tokenService.getIsPorte()){
        usuario = new Porte(data["id"] , data["nombre"] , data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO , true, new Direccion(data["residenteDeDireccion"]["id"] , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],localidad) ,provincia,
        data["cuentaBancaria"]); 
        instruccion = this.usuarioService.updatePorte(usuario);
      }
      else if(this.tokenService.getIsConductor()){
        usuario = new Conductor(data["id"] , data["nombre"] ,data["apellido"], data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO , data["activo"] , data["conductorDeTransporte"], new Direccion(data["residenteDeDireccion"]["id"] , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],localidad) ,provincia,
        data["cuentaBancaria"]); 
        instruccion = this.usuarioService.updateConductor(usuario);
      }
      else if(this.tokenService.getIsExpedidor()){
        console.log( data["expedidorDePorte"]);
        usuario = new Expedidor(data["id"] , data["nombre"] ,data["apellido"], data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO , data["activo"] , data["expedidorDePorte"], new Direccion(data["residenteDeDireccion"]["id"] , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],localidad) ,provincia,
        data["cuentaBancaria"]); 
       // instruccion = this.usuarioService.updateExpedidor(usuario);
      }

    }
    else{
      console.log("aqui");
      if(this.tokenService.getIsTransporte()){
        usuario = new Transporte(data["id"] , data["nombre"] , data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO , true,
        new Direccion(0 , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],dataform["localidad"]) , 
        dataform["provincia"],
        null); 
        instruccion = this.usuarioService.updateTransporte(usuario);
      }
      else if(this.tokenService.getIsConductor()){
        usuario = new Conductor(data["id"] , data["nombre"] ,data["apellido"] ,data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO , data["activo"],
        data["conductorDeTransporte"],new Direccion(0 , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],dataform["localidad"]) , 
        dataform["provincia"],
        null); 
        instruccion = this.usuarioService.updateConductor(usuario);
      }
      else if(this.tokenService.getIsPorte()){
        usuario = new Porte(data["id"] , data["nombre"] , data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO , true,
        new Direccion(0 , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],dataform["localidad"]) , 
        dataform["provincia"],
        null); 
        instruccion = this.usuarioService.updatePorte(usuario);
      }
      else if(this.tokenService.getIsExpedidor()){
        usuario = new Expedidor(data["id"] , data["nombre"] ,data["apellido"] ,data["nombreUsuario"] , data["password"] , data["documento"],
        data["email"] , this.prefijoO+this.telefonoO , data["activo"],
        data["expedidorDePorte"],new Direccion(0 , dataform["direccionvia"] ,dataform["direccion"],dataform["direccionnumero"],dataform["localidad"]) , 
        dataform["provincia"],
        null); 
        instruccion = this.usuarioService.updateExpedidor(usuario);
      }
    }

      instruccion.subscribe(data=>{

        var notificacion = new NuevaNotificacion("Perfil actualizado" , new Date(),this.usuario$.id, this.gravedad$[1].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();

        this.toastr.success('Perfil actualizado!', 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });


      this.refreshPerfil$.next(true);




      },
      err=>{
        var notificacion = new NuevaNotificacion("Ha sucedido un error actualizando el perfil" , new Date(),this.usuario$.id, this.gravedad$[2].id);
        this.notificacionService.addNotificacion(notificacion).subscribe();
        this.toastr.error('Ha sucedido un error!', 'Notificación',{
          progressBar:true,
          timeOut: 3000,
          easing:'ease-in',
          easeTime:300
        });
      }
    
    )  
 }

 onPassword(dataform:any){
  console.log(dataform);
   if(dataform["passwordnueva"] !=dataform["passwordnuevar"]){
    this.isCoincidente = true;
    this.errMsjPwd = "La password nueva no coincide con la repetida"
   }
   else if(dataform["passwordnueva"]===dataform["passwordvieja"]){
    this.isCoincidente = true;
    this.errMsjPwd = "La password nueva no puede coincidir con la actual"
   }
   else{
    this.isCoincidente = false;
    this.usuarioService.findUsuario(this.tokenService.getUserName()).subscribe(data=>{
      this.perfil = data;
      var cambioPwd :CambioPassword = new CambioPassword(dataform["passwordvieja"],dataform["passwordnueva"] ,dataform["passwordnuevar"],this.perfil.id)
      this.usuarioService.updatePassword(cambioPwd).subscribe(
        data=>{
          var notificacion = new NuevaNotificacion("Password actualizada" , new Date(),this.usuario$.id, this.gravedad$[1].id);
          this.notificacionService.addNotificacion(notificacion).subscribe();
  
          this.toastr.success('Password actualizada!', 'Notificación',{
            progressBar:true,
            timeOut: 3000,
            easing:'ease-in',
            easeTime:300
          });
          },
          err=>{
            this.errMsjPwd = err['error']['mensaje'];
            var notificacion = new NuevaNotificacion("Ha sucedido un error actualizando el perfil" , new Date(),this.usuario$.id, this.gravedad$[2].id);
            this.notificacionService.addNotificacion(notificacion).subscribe();
            this.toastr.error( this.errMsjPwd , 'Notificación',{
              progressBar:true,
              timeOut: 3000,
              easing:'ease-in',
              easeTime:300
            });
          }
      );
    })
   }
 }

/*Renew de los selects*/
renewProvincias(pais:any){
  if(pais != ""){
    this.paisO = pais;
    this.paisService.findProvincias(pais.id).subscribe(data=>{
      this.provincias = data;
      if(this.provincias.length>0){
        this.provinciaO = data[0]
        this.renewLocalidades(data[0]);
      }
      else{
        this.provinciaO = new Provincia(0,"",new Pais(0,""));
        this.localidadO = new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")));
        this.renewCp(this.localidadO);
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
      if(this.localidades.length>0){
        this.localidadO = data[0];
        this.renewCp(this.localidadO);
      }
      else{
        this.localidadO = new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")));
        this.renewCp(this.localidadO);
        this.localidades = [];
      }
      
    });
  }
  else{
    this.localidades = [];
    this.localidadO = new Localidad(0,"",0,new Provincia(0,"",new Pais(0,"")));
    this.renewCp(this.localidadO);
  }

}

renewCp(localidad:any){
  this.cp = localidad.cp;
}

compareFn(c1: any, c2: any): boolean {
  return c1 && c2 ? c1.selectedClient === c2.selectedClient : c1 === c2;
}




}

