import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data, map } from 'jquery';
import { interval, Observable, timeout } from 'rxjs';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { TipoCamion } from 'src/app/models/tipo-camion';
import { TipoRemolque } from 'src/app/models/tipo-remolque';
import { Viaje } from 'src/app/models/viaje';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TipoCamionService } from 'src/app/services/tipo-camion.service';
import { TipoRemolqueService } from 'src/app/services/tipo-remolque.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
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


/*Viajes*/
viajes:Viaje[];
idViajes = new Array();
viajesFiltrados:Viaje[];


/*Variables de busqueda*/
paisR:Pais|null; 
provinciaR:Provincia|null;
localidadR:Localidad|null;
paisE:Pais|null;
provinciaE:Provincia|null;
localidadE:Localidad|null;
fInicio:Date|null;
fFin:Date|null;
tipoCamion:TipoCamion|null;
tipoRemolque:TipoRemolque|null;
pagoMin:number|null;
horasMin:number|null;
horasMax:number|null;
distanciaMin:number|null;
distanciaMax:number|null;

  /***/
  isDuracion:boolean;
  timeLeft: number = 30;
  timeSelected:number = 30;
  interval:any;
  timePaused:boolean;

    /*Declaramos los datos que traemos para rellenar selects*/
    paisesR:Pais[];
    provinciasR:Provincia[];
    localidadesR:Localidad[];
    paisesE:Pais[];
    provinciasE:Provincia[];
    localidadesE:Localidad[];

  /*Tipos date*/
  hoy = new Date();
  shortTime:boolean;

    /*Iniciamos selects*/
    tiposCamion$!:Observable<TipoCamion[]>;
    tiposRemolque$!:Observable<TipoRemolque[]>; 

  constructor(
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
    private tipoCamionService:TipoCamionService,
    private tipoRemolqueService:TipoRemolqueService,
    private viajeService:ViajeService,
    ) { 

      this.viajes = [];
      this.viajesFiltrados=[];

      /*Variables de busqueda*/
        this.paisR = null;
        this.provinciaR = null;
        this.localidadR = null;
        this.paisE = null;
        this.provinciaE = null;
        this.localidadE = null;
        this.fInicio = null;
        this.fFin = null;
        this.tipoCamion = null;
        this.tipoRemolque = null;
        this.pagoMin = null;
        this.horasMin = null;
        this.horasMax = null;
        this.distanciaMin = null;
        this.distanciaMax = null;
        /**/
        this.isDuracion = true;
        this.timePaused = false;


          /*Inicializamos los selects*/
          this.paisesR = [];
          this.provinciasR = [];
          this.localidadesR = [];
          this.paisesE = [];
          this.provinciasE = [];
          this.localidadesE = [];

                /*Inicializamos dates*/
      this.shortTime = false;
          
  }

  ngOnInit(): void {
    this.startTimer();

      //Iniciamos tipos Camion y remolque
      this.tiposCamion$ = this.tipoCamionService.findAll();
      this.tiposRemolque$ = this.tipoRemolqueService.findAll();

    //Iniciamos los paises
    this.paisService.findAll().subscribe(data=>{
      this.paisesR = data;
      this.paisesE = data;
    })
  }

refreshViajes(){
  this.viajeService.findAllPanel().subscribe(
    data=>{
      this.viajes = data;
      console.log(this.viajes);
      
      this.viajesFiltrados = [];
      this.idViajes = [];

      if(this.paisR !=null){
        for(var viaje of this.viajes){
          if(viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.provinciaDePais.id == this.paisR.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
                  this.viajesFiltrados.push(viaje);
              }
          }
        }
      }

      if(this.provinciaR !=null){
        
        for(var viajef of this.viajesFiltrados){
          if(viajef.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.id != this.provinciaR.id){
            var i = this.viajesFiltrados.indexOf(viajef);
            this.viajesFiltrados.splice( i, 1 );
          }    
        }

        for(var viaje of this.viajes){
          if(viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.id == this.provinciaR.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      if(this.localidadR !=null){
        for(var viaje of this.viajes){
          if(viaje.recogidaDeDireccion.direccionDeLocalidad.id == this.localidadR.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }


     /* this.viajesFiltrados = [];
      for(var viaje of this.viajes){
        if(this.idViajes.includes(viaje.id)){
          this.viajesFiltrados.push(viaje);
        }
      }*/
     
    }
  )
}

/*CHECKS*/


/*Timers*/
  startTimer() {
    this.timePaused = false;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = this.timeSelected;
      }
    },1000)
  }


  pauseTimer() {
    clearInterval(this.interval);
    this.timePaused = true;
  }

  refreshTime(){
    this.timeLeft = this.timeSelected;
    this.refreshViajes();
  }

  changeTimer(time:number){
    this.timeSelected = time;
    this.refreshTime();
    this.refreshViajes();
  }

  ////

  checkTipoCamion(data:any){
    if(!data.enganche){
      $("#tipoRemolque").attr("disabled","disabled");
      $('#tipoRemolque').val("").attr("selected", "selected");;
    }else{
      $("#tipoRemolque").removeAttr("disabled","disabled");
    }
  }

    /*Renew Hours*/
    checkTime(){
      var fVal = new Date($("#fHoraFin").val());
      var fMin = new Date($("#fHoraFin").attr("min"));
      if(fVal.getTime()<fMin.getTime()){
        this.shortTime = true;
      }
      else {
        this.shortTime = false;
      }
    }

    /*Change Buttons*/
    changeButton(){
      if($("#botonFiltros").text() === "Más filtros"){
        $("#botonFiltros").text("Ocultar filtros");
      }
      else {
        $("#botonFiltros").text("Más filtros");
      }
    }

    changeDuration(data:any){
      if(data === "distancia"){
        this.isDuracion = false;
      }
      else{
        this.isDuracion = true;
      }
    }

      /*Renew de los selects*/
      renewProvinciasR(pais:any){
        
        $("#paisE").removeAttr("disabled");
        $("#provinciaE").removeAttr("disabled");
        $("#localidadE").removeAttr("disabled");
        $('#botonFiltros').removeClass('disabled-link');

        if(pais != ""){
          this.paisService.findProvincias(pais.id).subscribe(data=>{
            this.provinciasR = data;
            this.localidadesR = [];
          
          })
          this.paisR = pais;
          this.refreshViajes()
        }
        else{
          this.provinciasR = [];
          this.localidadesR = [];
          $("#paisE").attr("disabled" , "disabled");
          $("#provinciaE").attr("disabled" , "disabled");
          $("#localidadE").attr("disabled" , "disabled");
          $('#botonFiltros').addClass('disabled-link');
          this.paisR = null;
          this.refreshViajes()
        }
      }
    
      renewLocalidadesR(provincia:any){
        if(provincia !=""){
          this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
            this.localidadesR = data;
          });
          this.provinciaR = provincia;
          this.refreshViajes()
        }
        else{
          this.localidadesR = [];
          this.provinciaR = null;
          this.refreshViajes()
        }
    
      }

      renewLocalidadR(localidad:any){
        if(localidad !=""){
          this.localidadR = localidad;
          this.refreshViajes();
        }
        else{
          this.localidadR = null;
          this.refreshViajes();
        }
      }
    
    //////////////
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
    

    
  }



  


