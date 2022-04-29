import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Localidad } from '../../../../models/localidad';
declare var $:any;
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'panel-carga',
  templateUrl: './panel-carga.component.html',
  styleUrls: ['./panel-carga.component.css']
})
export class PanelCargaComponent implements OnInit {
  timeInicio = {hour: 13, minute: 30};
  timeFin = {hour: 13, minute: 30};
  public isCollapsed = true;
  localidades:Localidad[];
  errMsj!:string;

  constructor(private provinciaService:ProvinciaService,
    private usuarioService:UsuarioService,
    private tokenService:TokenService
    ) { 
    this.localidades = [];
  }

  ngOnInit(): void {
    if(this.tokenService.getIsConductor()){
      this.usuarioService.findConductorNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          console.log(data);
          if(!data["estado"]){
            this.errMsj = "Usted todavia no tiene acceso al panel de carga , comuniquese con su administrador para obtener acceso a el."
            $('#errorModal').modal({backdrop: 'static', keyboard: false})  
            $('#errorModal').modal("show");
          }
        }
      )
    }
    

    this.provinciaService.findLocalidades(1).subscribe(data=>{
      this.localidades = data;
    });
  }

  page = 4;

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

}
