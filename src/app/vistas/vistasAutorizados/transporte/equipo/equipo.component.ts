
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Conductor } from 'src/app/models/conductor';
import { TipoCamion } from 'src/app/models/tipo-camion';
import { TipoCamionService } from 'src/app/services/tipo-camion.service';
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
  conductores$!:Observable<Conductor[]>;


  constructor(
    private tipoCamionService:TipoCamionService,
    private usuarioService:UsuarioService,
    private tokenService:TokenService
  ) { 
  
  }

  ngOnInit(): void {
    this.tiposCamion$ = this.tipoCamionService.findAll();
    this.usuarioService.findEmpresaTransprte(this.tokenService.getUserName()).subscribe(
      data=>{
        this.conductores$ = this.usuarioService.findAllConductores(data["id"]);
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
