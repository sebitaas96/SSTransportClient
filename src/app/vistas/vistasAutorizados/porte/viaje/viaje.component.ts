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
import { Observable } from 'rxjs';
import { TipoRemolque } from 'src/app/models/tipo-remolque';
import { TipoCamion } from 'src/app/models/tipo-camion';
import { TipoCamionService } from 'src/app/services/tipo-camion.service';
import { TipoRemolqueService } from 'src/app/services/tipo-remolque.service';
import { EstadoService } from 'src/app/services/estado.service';
import {ViajeService} from 'src/app/services/viaje.service';
import { Viaje } from 'src/app/models/viaje';
import { Direccion } from 'src/app/models/direccion';
import { Estado } from 'src/app/models/estado';
import { Porte } from 'src/app/models/porte';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Expedidor } from 'src/app/models/expedidor';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare var $:any;

@Component({
  selector: 'viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {
  active = 1;
  isLinear = false;

  /**/
  viaje:Viaje;
  estados:Estado[];
  porte:Porte;
  expedidor:Expedidor;
  viajeCreado:boolean;
  viajeNoCreado:boolean;
  errMsj:string;

  /*Iniciamos selects*/
  tiposCamion$!:Observable<TipoCamion[]>;
  tiposRemolque$!:Observable<TipoRemolque[]>; 
  /*Tipos date*/
  hoy = new Date();
  shortTime:boolean;

  /*Precio*/
  slowPrice:boolean;

  /*Declaramos los datos que traemos para rellenar selects*/
  paisesR:Pais[];
  provinciasR:Provincia[];
  localidadesR:Localidad[];
  paisesE:Pais[];
  provinciasE:Provincia[];
  localidadesE:Localidad[];
  cpRecogida:string;
  cpEntrega:string;
  descripcionModal:string;




  /*Origen y destino del maps*/
  public lat = 24.799448;
  public lng = 120.979021;
  public origin: any;
  public destination: any;
  origen:string;
  destino:string;

  



  constructor(
    private route:ActivatedRoute , 
    private router:Router,
    private paisService:PaisService,
    private provinciaService:ProvinciaService,
    private tokenService:TokenService,
    private authService:AuthService,
    private googleMaps:GooglemapsService,
    private tipoCamionService:TipoCamionService,
    private tipoRemolqueService:TipoRemolqueService,
    private  estadoService:EstadoService,
    private usuarioService:UsuarioService,
    private viajeService:ViajeService,
    ) { 
      /*Viaje*/
      this.viaje = new Viaje(0,"",0,0,0,new Date(), new Date(),
      new Direccion(0,"","",0,new Localidad(0,"",0 , new Provincia(0,"",new Pais(0,"")))),
      new Direccion(0,"","",0,new Localidad(0,"",0 , new Provincia(0,"",new Pais(0,"")))),
      null,null,null,null,
      new TipoCamion(0,"",false),
      new TipoRemolque(0,""),
      null,
      null,
      null,
      new Estado(0,"")
      );

      this.estados = [];
      this.porte = new Porte(0,"","","","","","",true,null,null,null)
      this.expedidor = new Expedidor(0,"","","","","","","",false,new Porte(0,"","","","","","",true,null,null,null),null,null,null);
      this.viajeCreado = false;
      this.viajeNoCreado = false;
      /*Inicializamos dates*/
      this.shortTime = false;

      /*Price*/
      this.slowPrice = false;
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
    //Iniciamos empresa o expedidor 
    if(this.tokenService.getIsPorte()){
      this.usuarioService.findEmpresaPorteNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.porte = data;
        }
      )
    }
    else if(this.tokenService.getIsExpedidor()){
      this.usuarioService.findExpedidorNombre(this.tokenService.getUserName()).subscribe(
        data=>{
          this.expedidor = data;
        }
      )
    }

    //Iniciamos tipos Camion y remolque
    this.tiposCamion$ = this.tipoCamionService.findAll();
    this.tiposRemolque$ = this.tipoRemolqueService.findAll();
    this.estadoService.findAll().subscribe(
      data=>{
        this.estados = data;
      }
    );
    //Iniciamos los paises
    this.paisService.findAll().subscribe(data=>{
      this.paisesR = data;
      this.paisesE = data;
    })
   }

   onSubmit():void{

    this.viajeService.addViaje(this.viaje).subscribe(
      data=>{
        this.viajeCreado = true;
        this.viajeNoCreado = false;
        this.errMsj = data["mensaje"];
        this.reset();
        $("#reset").trigger("click");
        console.log(data);
      },
      err=>{
        this.viajeCreado = false;
        this.viajeNoCreado = true;
        this.errMsj = err['error']['mensaje'];
        $("#reset").trigger("click");
      }
    )
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
    this.viaje.recogidaDeDireccion = new Direccion(0 , data["direccionviaR"] ,data["direccionR"],data["direccionnumeroR"],
    data["localidadR"]
    );
    this.origen = data['localidadR']['nombre']+","+data["paisR"]["nombre"];
    this.updateDirection()
  }

  onEntrega(data:any , estado:boolean){
    console.log(data);
    this.viaje.entregaDeDireccion = new Direccion(0 , data["direccionviaE"] ,data["direccionE"],data["direccionnumeroE"],
    data["localidadE"]);
    this.destino = data['localidadE']['nombre']+","+data["paisE"]["nombre"];
    this.updateDirection()
  }

  onDatos(data:any , estado:boolean){
    console.log(data);
    console.log(this.estados);
    this.viaje.descripcion = data["descripcion"];
    this.viaje.precio = parseFloat($("#precio").val());
    this.viaje.distancia = parseInt($("#hdist").val());
    this.viaje.tiempo = parseInt($("#hhor").val());
    this.viaje.fHoraInicio = new Date($("#fInicio").val());
    this.viaje.fHoraFin = new Date($("#fHoraFin").val());
    this.viaje.viajeDeTipoCamion = data["tipoCamion"];
    this.viaje.viajeDeEstado = this.estados[0];
    if(!data["tipoCamion"]["enganche"]){
      this.viaje.viajeDeTipoRemolque = null;
    }
    else{
      this.viaje.viajeDeTipoRemolque = data["tipoRemolque"];
    }

    if(this.tokenService.getIsPorte()){
      this.viaje.viajeDePorte = this.porte;
    }
    else if(this.tokenService.getIsExpedidor()){
      this.viaje.viajeDeExpedidor = this.expedidor;
      this.viaje.viajeDePorte = this.expedidor.expedidorDePorte;
    }
    console.log(this.viaje);
  }

  reset(){
    $("#rForm").trigger("reset");
    $("#eForm").trigger("reset");
    $("#dForm").trigger("reset");

  }

  /*  Google maps*/

  updateDirection(){
    if(this.origen != "" && this.destino !=""){
      this.getDirection();
     /*var datos = this.googleMaps.getDistancia(this.origen, this.destino);
     console.log(datos);
     Promise.all([datos]).then(function(values){
      distancia = values;
     });*/
     new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [this.origen], 'destinations': [this.destino], travelMode:google.maps.TravelMode.DRIVING}, this.updateDistanceDuration);
    }
  
    }


  getDirection() {
    // Location within a string
    this.origin = this.origen;
    this.destination = this.destino;
  }

  updateDistanceDuration(response:any , status:any){
    
    var distanciatxt=response.rows[0].elements[0].distance.text;    
    var distanciaval = response.rows[0].elements[0].distance.value;
    var tiempoTxt = response.rows[0].elements[0].duration.text;
    var tiempo = response.rows[0].elements[0].duration.value;

    if(distanciaval!=0){
      var precio:number = (distanciaval/1000)*0.71;
    }
    else{
      var precio:number = (20000/1000)*0.71;
    }
    
    if(tiempo==0){
      tiempo=1800;
    }

    //Configuracion de la fecha
    var fechaEstimada = new Date(new Date().getTime()+(tiempo*1000));
    var fechaAhora = new Date();
    fechaEstimada.setMinutes(fechaEstimada.getMinutes()-fechaEstimada.getTimezoneOffset());
    fechaAhora.setMinutes(fechaAhora.getMinutes()-fechaAhora.getTimezoneOffset());
    //Configuracion de los inputs 
   $("#dist").text("Distancia estimada : "+distanciatxt);
   $("#hor").text("Tiempo estimado : "+ tiempoTxt);
   $("#hdist").val(distanciaval);
   $("#hhor").val(tiempo);

   $("#precio").val(Math.round(precio*100)/100);
   $("#labelPrecio").text("El precio minimo estimado de "+distanciatxt);
   $("#fInicio").val(fechaAhora.toISOString().slice(0,16));
   $("#fHoraFin").val(fechaEstimada.toISOString().slice(0,16));
   $("#fHoraFin").attr("min",fechaEstimada.toISOString().slice(0,16));
  }

  ///////////////////////////
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

  updateTime(){
    var tiempo;
    if($("#hhor").val()!=0){
      tiempo = $("#hhor").val();
    }
    else{
      tiempo=1800;
    }
    var fechaEstimada = new Date(new Date($("#fInicio").val()).getTime()+(tiempo*1000));
    fechaEstimada.setMinutes(fechaEstimada.getMinutes()-fechaEstimada.getTimezoneOffset());
    $("#fHoraFin").val(fechaEstimada.toISOString().slice(0,16));
    $("#fHoraFin").attr("min",fechaEstimada.toISOString().slice(0,16));

  }

  checkPrice(){
    var multiMin =parseFloat($("#multiplicador").attr("min"));
    var multi = parseFloat($("#multiplicador").val());
    var distancia = parseFloat($("#hdist").val());

    if(distancia ==0){
      distancia = 20000;
    }

    if(multi>=multiMin){
      this.slowPrice = false;
      var precioActualizado = (distancia/1000)*multi;
      $("#precio").val(precioActualizado.toFixed(2));
    }
    else{
      this.slowPrice = true;
    }
  }

  checkTipoCamion(data:any){
    if(!data.enganche){
      $("#tipoRemolque").attr("disabled","disabled");
      $('#tipoRemolque').val("").attr("selected", "selected");
    }else{
      $("#tipoRemolque").removeAttr("disabled","disabled");
    }
  }


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


  /* Generar PDF */
  downloadPDF() {
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var aleatorio = Math.round(Math.random()*200)+1;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(12);
    //doc.rect(5, 5, 585, 100); // caja entera

    //Primera linea 
    doc.rect(5,5,290.3,85); //caja izquierda
    doc.setFont('helvetica','bold');
    doc.text('1',15,30);
    doc.setFont('helvetica','normal');
    doc.text('Empresa: ' + this.porte.nombre + '\n' +
                    'Número de documento: ' + this.porte.documento + '\n' +
                    'Teléfono: ' + this.porte.telefono + '\n' +
                    'Email: ' + this.porte.email,30,30);
    
    doc.rect(293,5,292,85); //caja derecha
    doc.text('LETTRE DE VOITURE' + '\n' +
              'CONSIGNAMENT NOTE ' +'\n' +
              'FRACHTBRIEF' + '\n',310,20);
    doc.setFont('helvetica','bold');
    doc.rect(310,56,10,10);
    doc.rect(310,70,10,10);
    doc.text('X',311,65);
    doc.text('National' + '\n' +
              'International',330,65);
    doc.setFont('helvetica','normal');

    //Seguna linea
    doc.rect(5, 90, 580, 100);
    doc.text('Ce transport est soumis, nonobstant toute clause contraire, á la Convention relative au contrat de transport' + '\n' + 'international de marchandises par route (CMR).' + '\n' +
             'This carriage is subject notwithstanding any clause to the contrary, to the Convention on the contract for the' + '\n' + 'International Carriage of goods by road (CMR).' + '\n' +
             'Diese Beförderung unterliegt trotz einer gegenteiligen Abmachung den Bestimmungen des' + '\n' + 'Übereinkommens über den Beförderungsvertrag im internationalen.',10,110);

    //Tercera linea
    doc.rect(5,191,290.3,85); //caja izquierda   
    doc.setFont('helvetica','bold');
    doc.text('2',15,210);
    doc.setFont('helvetica','normal');
    doc.text('Empresa: Pendiente' + '\n' +
                    'Número de documento: Pendiente' + '\n' +
                    'Teléfono: Pendiente' + '\n' +
                    'Email: Pendiente',30,210);
    
    doc.rect(293,191,292,85); //caja derecha 
    doc.text('Destinatarie(nom,adresse,pays)' + '\n' + 
              'Consignee (name,address,country)' + '\n' + 
              'Empfänger(name, anschrift, land)',310,203);
    doc.setFont('helvetica','bold');
    doc.setFontSize(9);
    doc.text('QUIJOTE SEXTO CENTENARIO, SDAD COOP' + '\n' + 'DE CLM, FELIX PALACIOS, 21' + '\n' +
              ', Mota del Cuervo, CUENCA 16630, ES' + '\n' + 
              'VAT: F45756277',310,241);
    doc.setFont('helvetica','normal');
    doc.setFontSize(12);

    //Cuarta y quinta linea
    doc.rect(5,276,290.3,85); //caja izquierda
    doc.setFont('helvetica','bold');
    doc.text('3',15,293);
    doc.setFont('helvetica','normal');
    doc.text('Lieu prêvu pour la livraison de la marchandise' + '\n' + 
                    'Place of delivery of the goods (place,country)' + '\n' + 
                    'Auslieferungsort des Gutes (ort, land)' ,30,292.5);
    doc.setFont('helvetica','bold');
    doc.text('Please refer to section 2.',30,340);

    doc.rect(5,361,290.3,85); //caja izquierda
    doc.setFont('helvetica','bold');
    doc.text('4',15,380);
    doc.setFont('helvetica','normal');
    doc.text('Lieu et date de la prise en charge' + '\n' +
                    'Date and place of handover of goods' + '\n' +
                    'Tag und Ort der Übernahme des Guts' ,30,380);
    doc.setFont('helvetica','bold');
    doc.text(fecha + ' ' + hora + ' .Please refer to section 1' + '\n' + 'for place of handover.',30,425);
    doc.setFont('helvetica','normal');

    doc.rect(293,276,292,170); //caja derecha 
    doc.setFont('helvetica','bold');
    doc.text('5',310,293);
    doc.setFont('helvetica','normal');
    doc.text('Reserves et observations des transporteurs' + '\n' + 
              'Carriers reservation and observations' + '\n' + 
              'Vorbehalte und Bemerkungen der Frachtführer' + '\n' + 
              'Documents annexés' + '\n' + 
              'Documents attached' + '\n' + 
              'Beigefügte Dokumente',320,292.5);
    doc.setFont('helvetica','bold');
    doc.text('VRID: 1156PJJQZ' + '\n' + 
              'Trailer number: ANNYG R0391 BCD' + '\n' + 
              'Serial number: 350290' + '\n' + 
              'CRID: ' + aleatorio,320,385);
    doc.setFont('helvetica','normal');

    //sexta linea
    doc.rect(5, 446, 580, 100);
    doc.setFont('helvetica','bold');
    doc.text('6',15,460);
    doc.setFont('helvetica','normal');
    doc.text('Instructions de lexpéditeur (formalités douaniêre et autres)' + '\n' + 
              'Senders instructions' + '\n' + 
              'Vorbehalte und Bemerkungen der Frachtführer' + '\n' + 
              'Anweisungen des Absenders (Zoll- und sonstige amtliche Behandlung)',28,460);
    doc.setFont('helvetica','bold');
    doc.setFontSize(11);
    doc.text('SEAL NUMBER: ' + aleatorio + '\n' + 
              'Dangerous Goods packed in Limited Quantities(LQ) do not require a dangerous declaration,per ADR 3.4',28,520);
    doc.setFont('helvetica','normal');
    doc.setFontSize(12);

    //septima linea 
    doc.rect(5,546,290.3,85); //caja izquierda
    doc.setFont('helvetica','bold');
    doc.text('7',15,570);
    doc.setFont('helvetica','normal');
    doc.text('Prescription daffranchissement' + '\n' +
              'Prescription postage' + '\n' +
              'Frachtzahlunganweisungen' ,30,570);

    doc.rect(293,546,292,85); //caja derecha 
    doc.setFont('helvetica','bold');
    doc.text('8',310,570);
    doc.setFont('helvetica','normal');
    doc.text('Conventions particulières' + '\n' + 
              'Particular Convention' + '\n' + 
              'Besondere Vereinbarungen',325,570);
    doc.rect(325,610,10,10);
    doc.setFont('helvetica','bold');
    doc.text('X',326,620);
    doc.text('Adhered to the agreement',338,620);

    //octava linea
    doc.rect(5, 631, 580, 100);
    doc.setFont('helvetica','bold');
    doc.text('9',15,660);
    doc.setFont('helvetica','normal');
    doc.text('Etablie à / Established in / Ausgefertigt in / MAD8 le / on / am' + fecha + ' ' + hora + '\n' + 
              'Non Franco / Carriage unpaid / unfrei' + '\n' + 
              'Franco / Carriage paid / Frei' + '\n' + 
              'Amtl. Kennzeichen / License plate ',28,660);

    //novena linea
    doc.rect(5, 731, 580, 30);
    doc.setFont('helvetica','bold');
    doc.text('10',15,750);
    doc.setFont('helvetica','normal');  
    doc.text('         Company signature:       ' + '            Carrier signature:          ' + '          Trailer number:',28,750);
    doc.setFont('helvetica','bold');
    doc.text('ANNYG R0391BCD',470,750);

    doc.text('ONUS, ' + fecha + ' ' + hora,415,815);
    doc.save('DatosViaje.pdf');
  }




   /* Generador de PDF antiguo
   downloadPDF() {
    var DATA: any;
    DATA = document.getElementById('contenedorCanvas');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      
      const bufferX = 15;
      const bufferY = 140;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.setFontSize(12);
      docResult.setFont("helvetica");
      docResult.text('DATOS DEL VIAJE',230, 17);

      docResult.rect(25, 25, 550, 100); // empty square
      docResult.text('Empresa: ' + this.porte.nombre + '\n' +
                    'Número de documento: ' + this.porte.documento + '\n' +
                    'Teléfono: ' + this.porte.telefono + '\n' +
                    'Email: ' + this.porte.email,30,60);

      docResult.text('Portador: ' + '\n' +
                     'Número de documento: ' + '\n' +
                     'Teléfono: ' +  '\n' +
                     'Email: ' ,370, 60); 
      
      var hoy = new Date();
      var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
      var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
      docResult.text('ONUS, ' + fecha + ' ' + hora,420,800);
      
      docResult.save(fecha + '_DatosViaje.pdf')
      //docResult.save(`${new Date().toISOString()}_Resumen.pdf`);
      //docResult.autoPrint(); Te saca junto la página pdf la pantalla de imprimir
      //docResult.output('dataurlnewwindow'); Lo abre directamente en otra ventana
    });
  }*/


  /* Visualizaciones en página de Resumen */
  /*visualizarRecogida() {
    console.log("aqui")
    var $objetivo:any;
    var $contenedorCanvas:any;
    $objetivo = document.querySelector('#recogida'); //Que capturamos
    $contenedorCanvas = document.querySelector('#contenedorCanvas'); //donde ponemos la captura
    html2canvas($objetivo).then(canvas => {
      $contenedorCanvas.appendChild(canvas);
    })
  }

  visualizarEntrega() {
    var $objetivo:any;
    var $contenedorCanvas:any;
    $objetivo = document.querySelector('#entrega'); //Que capturamos
    $contenedorCanvas = document.querySelector('#contenedorCanvas'); //donde ponemos la captura
    html2canvas($objetivo).then(canvas => {
      $contenedorCanvas.appendChild(canvas);
    })
  }

  visualizarDatos() {
    var $objetivo:any;
    var $contenedorCanvas:any;
    $objetivo = document.querySelector('#datos'); //Que capturamos
    var $eliminarMap:any;
    //$eliminarMap = document.querySelector('#borrarMap');
    //$eliminarMap.remove();
    $contenedorCanvas = document.querySelector('#contenedorCanvas'); //donde ponemos la captura
    html2canvas($objetivo).then(canvas => {
      $contenedorCanvas.appendChild(canvas);
    })
  }*/



}
