import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Direccion } from '../../../../models/direccion';
import { Pais } from '../../../../models/pais';
import { Provincia } from '../../../../models/provincia';
import { Localidad } from '../../../../models/localidad';
import { PaisService } from '../../../../services/pais.service';
import { ProvinciaService } from '../../../../services/provincia.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Viaje } from 'src/app/models/viaje';
import { NgForm } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {

  /*Declaramos los datos que traemos para rellenar selects*/
  paises:Pais[];
  provincias:Provincia[];
  localidades:Localidad[];
  cp:string;
  errMsj:string;
  descripcionModal:string;

  constructor(
    private route:ActivatedRoute , 
    private router:Router,
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
    private tokenService:TokenService,
    private authService:AuthService) { 

      /*Inicializamos los selects*/
       this.paises = [];
       this.provincias = [];
       this.localidades = [];
       
       this.errMsj = "";
       this.cp = "";
       this.descripcionModal = "";
    }

  ngOnInit(): void {
    //Iniciamos los paises
    this.paisService.findAll().subscribe(data=>{
      this.paises = data;
    })
   }

   onSubmit(data:any):void{
     console.log(data);
/*
    this.authService.nuevo(viaje).subscribe(
      data => {
        $('#successModal').modal("show");
        
      },
      err => {
        this.errMsj = err['error']['mensaje'];
        $('#errorModal').modal("show");
      }
    ); */
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
