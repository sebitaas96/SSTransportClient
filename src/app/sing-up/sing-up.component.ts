import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  /*Declaramos los datos que traemos para rellenar selects*/
  roles:Rol[];
  paises:Pais[];
  provincias:Provincia[];
  localidades:Localidad[];
  tiposVias:Array<string>;

  /*Declaramos Asociaciones*/
  pais:Pais;
  provincia:Provincia;
  localidad:Localidad;
  rol:Rol;
  direccion:Direccion;


  /*Declaramos tipos de empresas que se peuden registrar*/
  transporte:Transporte;

  /*Atributos adicionales*/
  numVia:string;
  prefijo:string;
  telefono:string;
  nombre:string;
  documento:string;
  email:string;



  constructor(
    private route:ActivatedRoute , 
    private router:Router,
    private rolService:RolService,
    private transporteService:TransporteService,
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
  ) {
    /*Inicializamos los selects*/
    this.roles = [];
    this.paises = [];
    this.provincias = [];
    this.localidades = [];
  
    /*Inicializamos las asociaciones*/
    this.pais = new Pais(0,"");
    this.provincia  = new Provincia(0 , "", new Pais(0,""));
    this.localidad =  new Localidad(0 , "" , 0 , new Provincia(0 , "", new Pais(0 , "")));
    this.rol = new Rol(0,"");
    this.direccion = new Direccion(0, "" , "" , 0 , new Localidad(0 , "" , 0 , new Provincia(0 , "", new Pais(0 , ""))));


    /*Iniciamos el tipo de empresa*/
    this.transporte = new Transporte(0, "" , "" , "" , "", 
    new Direccion(0, "" , "" , 0 , new Localidad(0 , "" , 0 , new Provincia(0 , "", new Pais(0 , "")))),
    new Provincia(0 , "", new Pais(0,"")),
    null,
    new Rol(0 , "")
    )

    /*Inicializamos atributos adicionales*/
    this.tiposVias = ['calle' , 'avenida' , 'glorieta'];
    this.direccion.tipo = this.tiposVias[0];
    this.numVia = "";
    this.prefijo ="";
    this.telefono = "";
    this.nombre ="";
    this.documento ="";
    this.email = ""

  }

  /*Validaciones*/
  comprobarNombre():void{
    let vNom = /^[A-ZÑÇÁÉÍÓÚÜ]{1}[a-zA-ZÑÇÁÉÍÓÚÜñçáéíóúü]{2}[a-zA-ZÑÇÁÉÍÓÚÜñçáéíóúü\- ]{0,22}$/
    const element = document.getElementById('nombre');
    if(vNom.test(this.nombre)){
      console.log("si funcina");
      element?.classList.add('is-valid');
    }
    else{
      element?.classList.add('is-invalid');
      
      console.log(element);
    }
  }
  ///////////////



  ngOnInit(): void {
    //Iniciamos lso roles
    this.rolService.findAll().subscribe(data=>{
      this.roles = data;
      this.rol = data[0];
    });
    
    //Iniciamos los paises
    this.paisService.findAll().subscribe(data=>{
      this.paises = data;
      this.pais = data[0];
      this.renewProvincias(data[0]);
    })

    
  }

  onSubmit(data:any):void{
    console.log(data);
  }

 




/*Renew de los selects*/
  renewProvincias(pais:any){
    console.log(pais);
    if(pais != ""){
      this.paisService.findProvincias(pais.id).subscribe(data=>{
        this.provincias = data;
        console.log(this.provincias);
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


}
