import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { Localidad } from 'src/app/models/localidad';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import {GooglemapsService} from 'src/app/services/googlemaps.service';
import { data } from 'jquery';
declare var $:any;

@Component({
  selector: 'viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {
  active = 1;
  isLinear = false;


  /*Declaramos los datos que traemos para rellenar selects*/
  paisesR:Pais[];
  provinciasR:Provincia[];
  localidadesR:Localidad[];
  paisesE:Pais[];
  provinciasE:Provincia[];
  localidadesE:Localidad[];
  cpRecogida:string;
  cpEntrega:string;
  errMsj:string;
  descripcionModal:string;

  /*Origen y destino del maps*/
  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;
  origen:string;
  destino:string;
  distanciaTxt:string;
  tiempoTxt:string;
  distancia:number;
  tiempo:number;
  
  /*Variables ajenas*/
  precio:string;

  constructor(
    private route:ActivatedRoute , 
    private router:Router,
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
    private tokenService:TokenService,
    private authService:AuthService,
    private googleMaps:GooglemapsService
    ) { 

      /*Google maps*/
      this.distanciaTxt = "";
      this.tiempoTxt = "";
      this.tiempo = 0;
      this.distancia = 0;

      this.precio = "0";

      /*Inicializamos los selects*/
       this.paisesR = [];
       this.provinciasR = [];
       this.localidadesR = [];
       this.paisesE = [];
       this.provinciasE = [];
       this.localidadesE = [];
       
       this.errMsj = "";
       this.cpRecogida = "";
       this.cpEntrega = "";
       this.descripcionModal = "";

       this.origen = "";
       this.destino = "";
    }

  ngOnInit(): void {
    //Iniciamos los paises
    this.paisService.findAll().subscribe(data=>{
      this.paisesR = data;
      this.paisesE = data;
    })
   }

   onSubmit(data:any):void{
     console.log(data);
    /*let viaje:Viaje = new Viaje(0,data['descripcion'],data['fHoraFin'] ,data['fHoraInicio'],data['precio'],0, 
    new Direccion(0, data['direccionvia'] , data['direccion'] , Number(data['direccionnumero']) , data['localidad']),data['provincia'],
    0,
    new Direccion(0, data['direccionvia2'] , data['direccion2'] , Number(data['direccionnumero2']) , data['localidad2']),data['provincia2'],
    0,0,0,0
    )
    if(data['descripcion']!=""){
      this.descripcionModal = data['descripcion']
    }*/
    
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

  onRecogida(data:any , estado:boolean){
    console.log(data);
    this.origen = data['localidad']['nombre']+","+data["pais"]["nombre"];
    this.updateDirection()
  }

  onEntrega(data:any , estado:boolean){
    console.log(data);
    this.destino = data['localidad']['nombre']+","+data["pais"]["nombre"];
    this.updateDirection()
  }

  onDatos(data:any , estado:boolean){
    console.log(data);
  }



  /*  Google maps*/

  updateDirection(){
    if(this.origen != "" && this.destino !=""){
      this.getDirection();
     //var distancia = this.googleMaps.getDistancia(this.origen , this.destino);
     new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [this.origen], 'destinations': [ this.destino], travelMode:google.maps.TravelMode.DRIVING},this.updateDistanceDuration);
    }
  
    }


  getDirection() {
    //this.origin = { lat: 24.799448, lng: 120.979021 };
    //this.destination = { lat: 24.799524, lng: 120.975017 };
  
    // Location within a string
    this.origin = this.origen;
    this.destination = this.destino;
  }

  updateDistanceDuration(response:any , status:any){
    console.log(response.rows[0].elements[0].distance.text);
    this.distanciaTxt = response.rows[0].elements[0].distance.text;
    this.distancia = response.rows[0].elements[0].distance.value;
    this.tiempoTxt = response.rows[0].elements[0].duration.text;
    this.tiempo = response.rows[0].elements[0].duration.value;
   // this.precio = (this.distancia/1000)*0.71;
  }
  
  ///////////////////////////


  /*Renew de los selects*/
  renewProvinciasR(pais:any){
    if(pais != ""){
      this.paisService.findProvincias(pais.id).subscribe(data=>{
        this.provinciasR = data;
        this.localidadesR = [];
      })
    }
    else{
      this.provinciasR = [];
      this.localidadesR = [];
    }
  }

  renewLocalidadesR(provincia:any){
    if(provincia !=""){
      this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
        this.localidadesR = data;
      });
    }
    else{
      this.localidadesR = [];
    }

  }

  renewCpR(localidad:any){
    this.cpRecogida = localidad.cp;
  }

  renewProvinciasE(pais:any){
    if(pais != ""){
      this.paisService.findProvincias(pais.id).subscribe(data=>{
        this.provinciasE = data;
        this.localidadesE = [];
      })
    }
    else{
      this.provinciasE = [];
      this.localidadesE = [];
    }
  }

  renewLocalidadesE(provincia:any){
    if(provincia !=""){
      this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
        this.localidadesE = data;
      });
    }
    else{
      this.localidadesE = [];
    }

  }

  renewCpE(localidad:any){
    this.cpEntrega = localidad.cp;
  }



}
