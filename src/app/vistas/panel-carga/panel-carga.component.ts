import { Component, OnInit } from '@angular/core';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { Localidad } from '../../models/localidad';
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

  constructor(private provinciaService:ProvinciaService) { 
    this.localidades = [];
  }

  ngOnInit(): void {
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
