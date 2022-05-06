
import { Component, OnInit } from '@angular/core';
import { data } from 'jquery';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { asignacionEquipo } from 'src/app/dto/asignacionEquipo';
import { CambiarEstado } from 'src/app/dto/cambiarEstado';
import { Camion } from 'src/app/models/camion';
import { Conductor } from 'src/app/models/conductor';
import { Remolque } from 'src/app/models/remolque';
import { TipoCamion } from 'src/app/models/tipo-camion';
import { TipoRemolque } from 'src/app/models/tipo-remolque';
import { Transporte } from 'src/app/models/transporte';
import { CamionService } from 'src/app/services/camion.service';
import { RemolqueService } from 'src/app/services/remolque.service';
import { TipoCamionService } from 'src/app/services/tipo-camion.service';
import { TipoRemolqueService } from 'src/app/services/tipo-remolque.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
declare var $:any;
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  //Funciones componentes
  active = 1;
  closeResult = '';
  page = 1;
  filterTerm!: string;

  //Iniciamos selects
  tiposCamion$!:Observable<TipoCamion[]>;
  tiposRemolque$!:Observable<TipoRemolque[]>; 
  conductores$!:Observable<Conductor[]>;
  camiones$!:Observable<Camion[]>;
  remolques$!:Observable<Remolque[]>;
  refreshCamiones$ = new BehaviorSubject<boolean>(true);
  refreshRemolques$ = new BehaviorSubject<boolean>(true);
  empresa:Transporte|null;
  errMsj:string;
  isConductor:boolean;
  isTransporte:boolean;
  conductort:Conductor|null;
  
  //Camion
  camionCreado:boolean;
  camionNoCreado:boolean;
  estadoCamionCambiado:boolean;
  estadoCamionNoCambiado:boolean;
  camionEliminado:boolean;
  camionNoEliminado:boolean;
  conductorCAsignado:boolean;
  conductorCNoAsignado:boolean;
  errMsjC:string;

  //Remolque
  remolqueCreado:boolean;
  remolqueNoCreado:boolean;
  estadoRemolqueCambiado:boolean;
  estadoRemolqueNoCambiado:boolean;
  remolqueEliminado:boolean;
  remolqueNoEliminado:boolean;
  conductorRAsignado:boolean;
  conductorRNoAsignado:boolean;
  errMsjR:string;



  constructor(
    private tipoCamionService:TipoCamionService,
    private tipoRemolqueService:TipoRemolqueService,
    private camionService:CamionService,
    private remolqueService:RemolqueService,
    private usuarioService:UsuarioService,
    private tokenService:TokenService
  ) { 
    this.empresa = new Transporte(0,"","","","","","",null,null,null)
    this.errMsj = "";
    this.errMsjC = "";
    this.errMsjR = "";
    this.camionCreado = false;
    this.camionNoCreado = false;
    this.remolqueCreado = false;
    this.remolqueNoCreado = false;
    this.estadoCamionCambiado = false;
    this.estadoCamionNoCambiado = false;
    this.camionEliminado = false;
    this.camionNoEliminado = false;
    this.conductorCAsignado = false;
    this.conductorCNoAsignado = false;
    this.estadoRemolqueCambiado = false;
    this.estadoRemolqueNoCambiado = false;
    this.remolqueEliminado = false;
    this.remolqueNoEliminado = false;
    this.conductorRAsignado = false;
    this.conductorRNoAsignado = false;
    this.conductort = new Conductor(0,"","","","","","","",false,new Transporte(0,"","","","","","",null,null,null),null,null,null);
    this.isConductor = false;
    this.isTransporte = false;
  }

  ngOnInit(): void {
    this.tiposCamion$ = this.tipoCamionService.findAll();
    this.tiposRemolque$ = this.tipoRemolqueService.findAll();

    if(this.tokenService.getIsConductor()){
      this.isConductor = true;
      this.usuarioService.findConductorNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.conductort = data;
          this.camiones$ = this.refreshCamiones$.pipe(switchMap(_=>this.camionService.findAllConductor(data["id"])));
          this.remolques$ = this.refreshRemolques$.pipe(switchMap(_=> this.remolqueService.findAllConductor(data["id"])));
        }
      )
    }
    else if(this.tokenService.getIsTransporte()){
      this.isTransporte = true;
      this.usuarioService.findEmpresaTransprte(this.tokenService.getUserName()).subscribe(
        data=>{
          this.conductores$ = this.usuarioService.findAllConductores(data["id"]);
          this.camiones$ = this.refreshCamiones$.pipe(switchMap(_=>this.camionService.findAll(data["id"])));
          this.remolques$ = this.refreshRemolques$.pipe(switchMap(_=> this.remolqueService.findAll(data["id"])));
          this.empresa = data;
        }
      )
    }
  }



  onCamion(data:any){
    var conductor; 
    if(this.isConductor){
      conductor = this.conductort;
      this.empresa = null;
    }
    else if(data["conductor"]!=""){
      conductor = data["conductor"];
    }
    else {
      conductor = null;
    }
    var camion:Camion = new Camion(0,data["matricula"],false,this.empresa,conductor,data["tipoCamion"]);
    console.log(camion);
    this.camionService.addCamion(camion).subscribe(
      data=>{ 
        this.camionCreado = true;
        this.camionNoCreado = false;
        this.errMsj = data["mensaje"];
      },
      err=>{
        this.camionCreado = false;
        this.camionNoCreado = true;
        this.errMsj = err['error']['mensaje'];
      }
    );
  }

  onRemolque(data:any){
    var conductor; 
    if(this.isConductor){
      conductor = this.conductort;
      this.empresa = null;
    }
   else if(data["conductor"]!=""){
      conductor = data["conductor"];
    }
    else {
      conductor = null;
    }
    var remolque:Remolque = new Remolque(0,data["matricular"],false,this.empresa,conductor,data["tipoRemolque"])
    console.log(remolque);
    this.remolqueService.addRemolque(remolque).subscribe(
      data=>{
        this.remolqueCreado = true;
        this.remolqueNoCreado = false;
        this.errMsj = data["mensaje"];
      },
      err=>{
        this.remolqueCreado = false;
        this.remolqueNoCreado = true;
        this.errMsj = err['error']['mensaje'];
      }
    )
  }

  cambiarEstadoC(estado:boolean, idCamion:number){
    var cambiarEstado:CambiarEstado = new CambiarEstado(estado, idCamion);
    this.camionService.updateEstadoCamion(cambiarEstado).subscribe(
      data=>{
        this.estadoCamionCambiado = true;
        this.estadoCamionNoCambiado = false;
        this.errMsjC = data["mensaje"];
        this.refreshCamiones$.next(true);
      },
      err=>{
        this.estadoCamionCambiado = false;
        this.estadoCamionNoCambiado = true;
        this.errMsjC = err['error']['mensaje'];
      }
    )
  }

  cambiarEstadoR(estado:boolean, idRemolque:number){
    var cambiarEstado:CambiarEstado = new CambiarEstado(estado, idRemolque);
    this.remolqueService.updateEstadoRemolque(cambiarEstado).subscribe(
      data=>{
        this.estadoRemolqueCambiado = true;
        this.estadoCamionNoCambiado = false;
        this.errMsjR = data["mensaje"];
        this.refreshRemolques$.next(true);
      },
      err=>{
        this.estadoRemolqueCambiado = false;
        this.estadoCamionNoCambiado = true;
        this.errMsjR = err['error']['mensaje'];
      }
    )
  }

  cambiarConductorT(data:any){
    if(data !=""){
      this.conductort = new Conductor(data["id"],data["nombre"],data["apellido"],data["nombreUsuario"],
      data["password"],data["documento"],data["email"],data["telefono"],data["estado"],
      data["conductorDeTransporte"],data["residenteDeDireccion"],data["operadorDeProvincia"],
      data["cuentaBancaria"]);
    }
    else{
      this.conductort = null;
    }
  }

  asignarConductorC(camionId:number){
   var asignacion:asignacionEquipo = new asignacionEquipo(this.conductort , camionId);
   this.camionService.updateConductorCamion(asignacion).subscribe(
     data=>{
       this.conductorCAsignado = true;
       this.conductorCNoAsignado = false;
       this.errMsjC = data["mensaje"];
       this.refreshCamiones$.next(true);
     },
     err=>{
      this.conductorCAsignado = false;
      this.conductorCNoAsignado = true;
      this.errMsjC = err['error']['mensaje'];
     }
   )
  }

  asignarConductorR(remolqueId:number){
    var asignacion:asignacionEquipo = new asignacionEquipo(this.conductort , remolqueId);
    this.remolqueService.updateConductorRemolqiue(asignacion).subscribe(
      data=>{
        this.conductorRAsignado = true;
        this.conductorRNoAsignado = false;
        this.errMsjR = data["mensaje"];
        this.refreshRemolques$.next(true);
      },
      err=>{
        this.conductorRAsignado = false;
        this.conductorRNoAsignado = true;
        this.errMsjR = err['error']['mensaje'];
      }
    )
  }

  eliminarCamion(idCamion:number){
    this.camionService.deleteCamion(idCamion).subscribe(
      data=>{
        this.camionEliminado = true;
        this.camionNoEliminado = false;
        this.errMsjC = data["mensaje"];
        this.refreshCamiones$.next(true);
      },
      err=>{
        this.camionEliminado = false;
        this.camionNoEliminado = true;
        this.errMsjC = err["error"]["mensaje"];
      }
    )
  }

  eliminarRemolque(idRemolque:number){
    this.remolqueService.deleteRemolque(idRemolque).subscribe(
      data=>{
        this.remolqueEliminado = true;
        this.remolqueNoEliminado = false;
        this.errMsjR = data["mensaje"];
        this.refreshRemolques$.next(true);
      },
      err=>{
        this.remolqueEliminado = false;
        this.remolqueNoEliminado = true;
        this.errMsjR = err["error"]["mensaje"];
      }
    )

  }

  //Funciones de componentes

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
