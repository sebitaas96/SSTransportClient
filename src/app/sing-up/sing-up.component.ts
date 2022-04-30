import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuentaBancaria } from '../models/cuenta-bancaria';
import { Direccion } from '../models/direccion';
import { Localidad } from '../models/localidad';
import { Pais } from '../models/pais';
import { Provincia } from '../models/provincia';
import { Rol } from '../models/rol';
import { Transporte } from '../models/transporte';
import { RolService } from '../services/rol.service';
import { TransporteService } from '../services/transporte.service';
import { PaisService } from '../services/pais.service';
import { ProvinciaService } from '../services/provincia.service';

@Component({
  selector: 'sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {

  roles:Rol[];
  paises:Pais[];
  provincias:Provincia[];
  localidades:Localidad[];
  paisSeleccionado:Pais;
  provinciaSeleccionada:Provincia;

  transporte:Transporte;
  tipoEmpresa:Rol;



  constructor(
    private route:ActivatedRoute , 
    private router:Router,
    private rolService:RolService,
    private transporteService:TransporteService,
    private paisService:PaisService,
    private provinciaService:ProvinciaService
  ) {
    this.roles = [];
    this.paises = [];
    this.provincias = [];
    this.localidades = [];

    /*Seleccionados para iniciar Selects*/
    this.tipoEmpresa = new Rol(0,"");
    this.paisSeleccionado = new Pais(0,"");
    this.provinciaSeleccionada = new Provincia(0 ,"",new Pais(0,""));

    /*Iniciamos el tipo de empresa*/
    this.transporte = new Transporte(0, "" , "" , "" , "", 
    new Direccion(0, "" , "" , 0 , new Localidad(0 , "" , 0 , new Provincia(0 , "", new Pais(0 , "")))),
    new Provincia(0 , "", new Pais(0,"")),
    new CuentaBancaria(0 , "" , ""),
    new Rol(0 , "")
    )

  }

  ngOnInit(): void {
    this.rolService.findAll().subscribe(data=>{
      this.roles = data;

      /*Aqui seleccion un rol para hacer las dos ventanas*/
      this.roles.forEach(rol =>{
        if(rol.nombre == "Transportes"){
          this.tipoEmpresa = rol;
        }
      });
    });
    
    this.paisService.findAll().subscribe(data=>{
      this.paises = data;
      this.renewProvincias(data[0]);
    })
  }

  onSubmit():void{
    console.log("Legue aqui");
  }

  cambiarRol(rol:Rol){
    this.tipoEmpresa = rol;    
  }

  renewProvincias(pais:Pais){
    this.paisSeleccionado = pais;
    this.paisService.findProvincias(pais.id).subscribe(data=>{
      this.provincias = data;
      this.renewLocalidades(data[0]);
    })
  }

  renewLocalidades(provincia:Provincia){
    if(provincia !=null){
      this.provinciaSeleccionada = provincia;
      this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
        this.localidades = data;
      });
    }
    else{
      this.localidades = [];
    }

  }

}
