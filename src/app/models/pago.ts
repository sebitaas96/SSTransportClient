import { Transporte } from "./transporte";
import { EstadoPago } from "./estadoPago";
import { Viaje } from "./viaje";
import { Porte } from "./porte";

export class Pago {
    id:number;
    fFactura:Date;
    fPago:Date;
    importe:number;
    pagoDeTransporte:Transporte;
    pagoDePorte:Porte;
    pagoDeEstadoPago:EstadoPago;
    viaje:Viaje;

    constructor(
        id:number,
        fFactura:Date,
        fPago:Date,
        importe:number,
        pagoDeTransporte:Transporte,
        pagoDePorte:Porte,
        pagoDeEstadoPago:EstadoPago,
        viaje:Viaje
    ){
        this.id = id;
        this.fFactura = fFactura;
        this.fPago = fPago;
        this.importe = importe;
        this.pagoDeTransporte = pagoDeTransporte;
        this.pagoDePorte = pagoDePorte;
        this.pagoDeEstadoPago = pagoDeEstadoPago;
        this.viaje = viaje;

    }
}
