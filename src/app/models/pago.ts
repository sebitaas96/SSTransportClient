import { Transporte } from "./transporte";
import { Viaje } from "./viaje";

export class Pago {
    id:number;
    pId:string;
    fFactura:Date;
    fPago:Date;
    estado:boolean;
    importe:number;
    pagoDeTransporte:Transporte;
    viaje:Viaje;

    constructor(
        id:number,
        pId:string,
        fFactura:Date,
        fPago:Date,
        estado:boolean,
        importe:number,
        pagoDeTransporte:Transporte,
        viaje:Viaje
    ){
        this.id = id;
        this.pId = pId;
        this.fFactura = fFactura;
        this.fPago = fPago;
        this.estado = estado;
        this.importe = importe;
        this.pagoDeTransporte = pagoDeTransporte;
        this.viaje = viaje;

    }
}
