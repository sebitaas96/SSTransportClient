import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { data, map } from 'jquery';
import { interval, Observable, of, timeout } from 'rxjs';
import { Conductor } from 'src/app/models/conductor';
import { Pais } from 'src/app/models/pais';
import { Provincia } from 'src/app/models/provincia';
import { TipoCamion } from 'src/app/models/tipo-camion';
import { TipoRemolque } from 'src/app/models/tipo-remolque';
import { Transporte } from 'src/app/models/transporte';
import { Viaje } from 'src/app/models/viaje';
import { PaisService } from 'src/app/services/pais.service';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { TipoCamionService } from 'src/app/services/tipo-camion.service';
import { TipoRemolqueService } from 'src/app/services/tipo-remolque.service';
import { TokenService } from 'src/app/services/token.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ViajeService } from 'src/app/services/viaje.service';
import { Localidad } from '../../../../models/localidad';
import {ReservarViaje} from '../../../../dto/reservarViaje';


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
  closeResult = '';


/*Viajes*/
viajes:Viaje[];
idViajes = new Array();
viajesFiltrados:Viaje[];
nResultados:number;
idViajeAReservar:number;
isReservado:boolean;
notReservado:boolean;
errMsj:string;

/*Filters*/
isFInicio:boolean;
isFFin:boolean;
isTipoCamion:boolean;
isTipoRemolque:boolean;
isPagoMinimo:boolean;
isHorasMinimo:boolean;
isHorasMaximo:boolean;
isDistanciaMinimo:boolean;
isDistanciaMaximo:boolean;

infoFInicio:string;
infoFFin:string;
infoTipoCamion:string|any;
infoTipoRemolque:string|any;
infoPagoMinimo:string;
infoHorasMinimo:string;
infoHorasMaximo:string;
infoDistanciaMinimo:string;
infoDistanciaMaximo:string;

isMinMayMax:boolean;

/*Maps */
idMap:number;

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


      /*Origen y destino del maps*/
  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;


  constructor(
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
    private tipoCamionService:TipoCamionService,
    private tipoRemolqueService:TipoRemolqueService,
    private viajeService:ViajeService,
    private modalService: NgbModal,
    private tokenService:TokenService,
    private usuarioService:UsuarioService
    ) { 

      this.viajes = [];
      this.viajesFiltrados=[];
      this.nResultados = 0;
      this.idViajeAReservar = 0;
      this.isReservado = false;
      this.notReservado = false;
      this.errMsj = "";

      /*Filters*/
      this.isFInicio=false;
      this.isFFin=false;
      this.isTipoCamion=false;
      this.isTipoRemolque=false;
      this.isPagoMinimo=false;
      this.isHorasMinimo=false;
      this.isHorasMaximo=false;
      this.isDistanciaMinimo=false;
      this.isDistanciaMaximo=false;

      this.infoFInicio="";
      this.infoFFin="";
      this.infoTipoCamion="";
      this.infoTipoRemolque="";
      this.infoPagoMinimo="";
      this.infoHorasMinimo="";
      this.infoHorasMaximo="";
      this.infoDistanciaMinimo="";
      this.infoDistanciaMaximo="";

      this.isMinMayMax = false;

      /*Maps*/
      this.idMap = 0;


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
      this.viajesFiltrados = [];
      this.idViajes = [];
      console.log(this.viajes);

      if(this.paisR !=null){
        for(var viaje of this.viajes){
          if(viaje.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.provinciaDePais.id === this.paisR.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
                  this.viajesFiltrados.push(viaje);
              }
          }
        }
      }


      if(this.provinciaR !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.recogidaDeDireccion.direccionDeLocalidad.localidadDeProvincia.id != this.provinciaR.id){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);
            
          }    
        }
        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
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
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.recogidaDeDireccion.direccionDeLocalidad.id != this.localidadR.id){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);
            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.recogidaDeDireccion.direccionDeLocalidad.id == this.localidadR.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }


      //Control de entrega 

      if(this.paisE !=null){
        for(var viaje of this.viajes){
          if(viaje.entregaDeDireccion.direccionDeLocalidad.localidadDeProvincia.provinciaDePais.id === this.paisE.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
                  this.viajesFiltrados.push(viaje);
              }
          }
        }
      }


      if(this.provinciaE !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.entregaDeDireccion.direccionDeLocalidad.localidadDeProvincia.id != this.provinciaE.id){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);
            
          }    
        }
        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.entregaDeDireccion.direccionDeLocalidad.localidadDeProvincia.id == this.provinciaE.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }
      

      if(this.localidadE !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.entregaDeDireccion.direccionDeLocalidad.id != this.localidadE.id){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);
            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.entregaDeDireccion.direccionDeLocalidad.id == this.localidadE.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }


      //Control de fechas 
      if(this.fInicio !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(new Date(viajef.fHoraInicio).getTime() < this.fInicio.getTime()){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(new Date(viaje.fHoraInicio).getTime()  >= this.fInicio.getTime()){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      if(this.fFin !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(new Date(viajef.fHoraFin).getTime() > this.fFin.getTime()){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(new Date(viaje.fHoraFin).getTime()  <= this.fFin.getTime()){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      //Control tipo Camion y Tipo Remolque 
      if(this.tipoCamion !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.viajeDeTipoCamion.id != this.tipoCamion.id){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.viajeDeTipoCamion.id == this.tipoCamion.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }


      if(this.tipoRemolque !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.viajeDeTipoRemolque?.id != this.tipoRemolque.id){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.viajeDeTipoRemolque?.id == this.tipoRemolque.id){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      //CheckPagoMin
      if(this.pagoMin !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.precio < this.pagoMin){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.precio >= this.pagoMin){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      //checkHorasMinMAX
      if(this.horasMin !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.tiempo < (this.horasMin*3600)){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.tiempo >= (this.horasMin*3600)){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      if(this.horasMax !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.tiempo > (this.horasMax*3600)){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.tiempo <= (this.horasMax*3600)){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      //checkDistanciaMinMax
      if(this.distanciaMin !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.distancia < (this.distanciaMin*1000)){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.distancia >= (this.distanciaMin*1000)){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      if(this.distanciaMax !=null){
        var viajesFunados = [];

        for(var viajef of this.viajesFiltrados){
          if(viajef.distancia > (this.distanciaMax*1000)){
            var i = this.viajesFiltrados.indexOf(viajef);
            viajesFunados.push(i);            
          }    
        }

        viajesFunados.reverse();
        for(var viajeFunado of viajesFunados){
          this.viajesFiltrados.splice( viajeFunado, 1 );
        }

        for(var viaje of this.viajes){
          if(viaje.distancia <= (this.distanciaMax*1000)){
              if(!this.idViajes.includes(viaje.id)){
                  this.idViajes.push(viaje.id);
              }
          }
        }
      }

      this.nResultados = this.viajesFiltrados.length;
      console.log(this.viajesFiltrados);
     
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
        this.refreshViajes();
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
    if(data !=""){
      this.tipoCamion = data;
      this.isTipoCamion = true;
      this.infoTipoCamion = this.tipoCamion?.nombre;
    }
    else{
      this.tipoCamion =null;
      this.isTipoCamion = false;
      this.infoTipoCamion = "";
    }
    console.log(this.tipoCamion);

    if(!data.enganche){
      $("#tipoRemolque").attr("disabled","disabled");
      $('#tipoRemolque').val("").attr("selected", "selected");;
    }else{
      $("#tipoRemolque").removeAttr("disabled","disabled");
    }

    this.refreshViajes();
  }

  checkTipoRemolque(data:any){
    if(data !=""){
      this.tipoRemolque = data;
      this.isTipoRemolque = true;
      this.infoTipoRemolque = this.tipoRemolque?.nombre;
    }
    else{
      this.tipoRemolque =null;
      this.isTipoRemolque = false;
      this.infoTipoRemolque = "";
    }
    this.refreshViajes();
  }

  //CheckPagoMin
  checkPagoMin(data:any){
    var patron1 = /^[123456789]{1}[\d]*$/
    if(data!="" && patron1.test(data)){
      this.pagoMin = parseFloat(data);
      this.isPagoMinimo= true;
      this.infoPagoMinimo = this.pagoMin+"";
    }
    else{
      this.pagoMin = null;
      this.isPagoMinimo = false;
      this.infoPagoMinimo = "";
    }
    this.refreshViajes();
  }

  //Check Horas Min y Max 
  checkHorasMin(data:any){
    var patron1 = /^[123456789]{1}[\d]*$/
    if(data!="" && patron1.test(data)){
      this.horasMin = parseInt(data);
      if(this.checkMinMax(this.horasMin , this.horasMax)){
        this.isHorasMinimo = true;
        this.infoHorasMinimo = this.horasMin+" h";
        this.isMinMayMax = false;
      }
      else{
        this.isMinMayMax = true;
      }
    }
    else{
      this.horasMin = null;
      this.isHorasMinimo = false;
      this.infoHorasMinimo = "";
    }
    if(!this.isMinMayMax){
      this.refreshViajes();
    }
    
  }

  checkHorasMax(data:any){
    var patron1 = /^[123456789]{1}[\d]*$/
    if(data!="" && patron1.test(data)){
      this.horasMax = parseInt(data);
      if(this.checkMinMax(this.horasMin , this.horasMax)){
        this.isHorasMaximo = true;
        this.infoHorasMaximo = this.horasMax+" h";
        this.isMinMayMax = false;
      }
      else{
        this.isMinMayMax = true;
      }
     
    }
    else{
      this.horasMax = null;
      this.isHorasMaximo = false;
      this.infoHorasMaximo = "";
    }
    if(!this.isMinMayMax){
      this.refreshViajes();
    }
  }

  //Check Distancia Min y Max 

  checkDistanciaMin(data:any){
    var patron1 = /^[123456789]{1}[\d]*$/
    if(data!="" && patron1.test(data)){
      this.distanciaMin = parseInt(data);
      if(this.checkMinMax(this.distanciaMin , this.distanciaMax)){
        this.isDistanciaMinimo = true;
        this.infoDistanciaMinimo = this.distanciaMin+" Km";
        this.isMinMayMax = false;
      }
      else{
        this.isMinMayMax = true;
      }

    }
    else{
      this.distanciaMin = null;
      this.isDistanciaMinimo = false;
      this.infoDistanciaMinimo = "";
    }
    
    if(!this.isMinMayMax){
      this.refreshViajes();
    }
  }

  checkDistanciaMax(data:any){
    var patron1 = /^[123456789]{1}[\d]*$/
    if(data!="" && patron1.test(data)){
      this.distanciaMax = parseInt(data);
      if(this.checkMinMax(this.distanciaMin , this.distanciaMax)){
        this.isDistanciaMaximo = true;
        this.infoDistanciaMaximo = this.distanciaMax+" Km";
        this.isMinMayMax = false;
      }
      else{
        this.isMinMayMax = true;
      }

    }
    else{
      this.distanciaMax = null;
      this.isDistanciaMaximo = false;
      this.infoDistanciaMaximo = "";
    }

    if(!this.isMinMayMax){
      this.refreshViajes();
    }
  }

    /*Renew Hours*/
    checkTime(){
      if($("#fHoraFin").val()!=""){
        this.fFin = new Date($("#fHoraFin").val());
        this.isFFin = true;
        this.infoFFin = $("#fHoraFin").val();
      }
      else{
        this.fFin =null;
        this.isFFin = false;
        this.infoFFin ="";
      }

      var fVal = new Date($("#fHoraFin").val());
      var fMin = new Date($("#fHoraFin").attr("min"));
      if(fVal.getTime()<fMin.getTime()){
        this.shortTime = true;
      }
      else {
        this.shortTime = false;
        this.refreshViajes();
      }
    }

    updateTime(){
      if($("#fInicio").val()!=""){
        this.fInicio = new Date($("#fInicio").val());
        this.isFInicio = true;
        this.infoFInicio = $("#fInicio").val();
      }
      else{
        this.fInicio =null;
        this.isFInicio = false;
        this.infoFInicio = "";
      }
    
      var fechaEstimada = new Date(new Date($("#fInicio").val()).getTime());
      fechaEstimada.setMinutes(fechaEstimada.getMinutes()-fechaEstimada.getTimezoneOffset());
      $("#fHoraFin").attr("min",fechaEstimada.toISOString().slice(0,16));
      this.refreshViajes();
  
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
      this.isMinMayMax = false;
      if(data === "distancia"){
        this.isDuracion = false;
        this.horasMin = null;
        this.horasMax = null;
        this.removeHorasMaximo();
        this.removeHorasMinimo();
      }
      else{
        this.isDuracion = true;
        this.distanciaMin = null;
        this.distanciaMax = null;
        this.removeDistanciaMaximo();
        this.removeDistanciaMinimo();
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
          this.provinciaR = null;
          this.localidadR = null;
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
          this.provinciaR = null;
          this.localidadR = null;
          
          //Eliminamos todo lo demas 
          this.paisE = null;
          this.provinciaE = null;
          this.localidadE = null;

          this.fInicio = null;
          this.fFin = null;

          this.tipoCamion = null;
          this.tipoRemolque = null;
          this.refreshViajes()
        }
      }
    
      renewLocalidadesR(provincia:any){
        if(provincia !=""){
          this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
            this.localidadesR = data;
          });
          this.provinciaR = provincia;
          this.localidadR = null;
          this.refreshViajes()
        }
        else{
          this.localidadesR = [];
          this.provinciaR = null;
          this.localidadR = null;
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
          this.paisE = pais;
          this.provinciaE = null;
          this.localidadE = null;
          this.refreshViajes()
        }
        else{
          this.provinciasE = [];
          this.localidadesE = [];
          this.paisE = null;
          this.provinciaE = null;
          this.localidadE = null;
          this.refreshViajes()
        }
      }
    
      renewLocalidadesE(provincia:any){
        if(provincia !=""){
          this.provinciaService.findLocalidades(provincia.id).subscribe(data=>{
            this.localidadesE = data;
          });
          this.provinciaE = provincia;
          this.localidadE = null;
          this.refreshViajes()
        }
        else{
          this.localidadesE = [];
          this.provinciaE = null;
          this.localidadE = null;
          this.refreshViajes()
        }
    
      }

      renewLocalidadE(localidad:any){
        if(localidad !=""){
          this.localidadE = localidad;
          this.refreshViajes();
        }
        else{
          this.localidadE = null;
          this.refreshViajes();
        }
      }


      removeFInicio(){
        $("#fInicio").val("");
        this.fInicio = null;
        this.isFInicio = false;
        this.infoFInicio = "";
        this.refreshViajes();
      }

      removeFFin(){
        $("#fHoraFin").val("");
        this.fFin = null;
        this.isFFin = false;
        this.infoFFin = "";
        this.refreshViajes();
      }

      removeTipoCamion(){
        $("#tipoCamion").val("");
        this.tipoCamion = null;
        this.isTipoCamion =false;
        this.infoTipoCamion="";
        this.refreshViajes();
      }

      removeTipoRemolque(){
        $("#tipoRemolque").val("");
        this.tipoRemolque = null;
        this.isTipoRemolque =false;
        this.infoTipoRemolque="";
        this.refreshViajes();
      }

      removePagoMinimo(){
        $("#pago").val("");
        this.pagoMin = null;
        this.isPagoMinimo =false;
        this.infoPagoMinimo="";
        this.refreshViajes();
      }

      removeHorasMinimo(){
        $("#horasmin").val("");
        this.horasMin = null;
        this.isHorasMinimo =false;
        this.infoHorasMinimo="";
        this.refreshViajes();
      }

      removeHorasMaximo(){
        $("#horasmax").val("");
        this.horasMax = null;
        this.isHorasMaximo =false;
        this.infoHorasMaximo="";
        this.refreshViajes();
      }

      removeDistanciaMinimo(){
        $("#distanciamin").val("");
        this.distanciaMin = null;
        this.isDistanciaMinimo =false;
        this.infoDistanciaMinimo="";
        this.refreshViajes();
      }

      removeDistanciaMaximo(){
        $("#distanciamax").val("");
        this.distanciaMax = null;
        this.isDistanciaMaximo =false;
        this.infoDistanciaMaximo="";
        this.refreshViajes();
      }

      checkMinMax(min:number|null , max:number|null):boolean|any{
        if(min ==null && max!=null){
          return true;
        }
        else if(max==null && min!=null){
          return true;
        }
        else if(max !=null && min!=null){
          if(min>max){
            return false;
          }
          else{
            return true;
          }
        }
      }

      updateMap(id:number){
        this.idMap = id;
      }


      /*Reserva*/

      onReserva(data:any){
        console.log("aqui")
        var transporte:Transporte;
        var conductor:Conductor;
        if(this.tokenService.getIsTransporte()){
          this.usuarioService.findEmpresaTransprte(this.tokenService.getUserName()).subscribe(
            data=>{
                transporte = data;
                var reservarViaje = new ReservarViaje(this.idViajeAReservar , transporte , null);
                this.viajeService.reservarViaje(reservarViaje).subscribe(
                  data=>{
                    this.isReservado = true;
                    this.notReservado = false;
                    this.errMsj = data["mensaje"];
                    console.log(data);
                    this.refreshViajes();
                  },
                  err=>{
                    this.notReservado = true;
                    this.isReservado = false;
                    this.errMsj = err['error']['mensaje'];
                    this.refreshViajes();
                  }
                )
            }
            )

        }
        else if(this.tokenService.getIsConductor()){
          this.usuarioService.findConductorNombre(this.tokenService.getUserName()).subscribe(
            data=>{
              conductor = data;
              transporte = data["conductorDeTransporte"];
              var reservarViaje = new ReservarViaje(this.idViajeAReservar , transporte , conductor);
              this.viajeService.reservarViaje(reservarViaje).subscribe(
                data=>{
                  this.isReservado = true;
                  this.notReservado = false;
                  this.errMsj = data["mensaje"];
                  console.log(data);
                  this.refreshViajes();
                },
                err=>{
                  this.notReservado = true;
                  this.isReservado = false;
                  this.errMsj = err['error']['mensaje'];
                  this.refreshViajes();
                }
              )
            }
          )
        }



      }
  
      open(content:any , viajeIdReservar:number) {
        this.idViajeAReservar = viajeIdReservar;
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title' ,size:'lg'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }
  }



  


