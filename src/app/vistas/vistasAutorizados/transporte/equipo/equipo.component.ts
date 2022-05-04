
import { Component, OnInit } from '@angular/core';
import { NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Camion } from 'src/app/models/camion';
import { Conductor } from 'src/app/models/conductor';
import { Direccion } from 'src/app/models/direccion';
import { Localidad } from 'src/app/models/localidad';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
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
  empresa:Transporte;



  constructor(
    private tipoCamionService:TipoCamionService,
    private tipoRemolqueService:TipoRemolqueService,
    private camionService:CamionService,
    private remolqueService:RemolqueService,
    private usuarioService:UsuarioService,
    private tokenService:TokenService
  ) { 
    this.empresa = new Transporte(0,"","","","","","",null,null,null)
  }

  ngOnInit(): void {
    this.tiposCamion$ = this.tipoCamionService.findAll();
    this.tiposRemolque$ = this.tipoRemolqueService.findAll();
    this.usuarioService.findEmpresaTransprte(this.tokenService.getUserName()).subscribe(
      data=>{
        this.conductores$ = this.usuarioService.findAllConductores(data["id"]);
        this.camiones$ = this.camionService.findAll(data["id"]);
        this.remolques$ = this.remolqueService.findAll(data["id"]);
        this.empresa = data;
      }
    )
  }



  onCamion(data:any){
    var conductor; 
    if(data["conductor"]!=""){
      conductor = data["conductor"];
    }
    else {
      conductor = null;
    }
    var camion:Camion = new Camion(0,data["matricula"],false,this.empresa,conductor,data["tipoCamion"]);
    console.log(camion);
    this.camionService.addCamion(camion).subscribe(
      data=>{
        
      }
    );
  }

  onRemolque(data:any){
    var conductor; 
    if(data["conductor"]!=""){
      conductor = data["conductor"];
    }
    else {
      conductor = null;
    }
    var remolque:Remolque = new Remolque(0,data["matricula"],false,this.empresa,conductor,data["tipoRemolque"])
    console.log(remolque);
    this.remolqueService.addRemolque(remolque).subscribe(
      data=>{

      }
    )
  }

  cambiarEstadoC(estado:boolean, idCamion:number){

  }

  eliminarCamion(idCamion:number){

  }

  //Funciones de componentes

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }
}
