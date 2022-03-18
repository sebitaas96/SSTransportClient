import { CuentaBancaria } from "./cuentaBancaria";
import { Rol } from "./rol";
import { Viaje } from "./viaje";

export class Pago {
    pid:number;
    fFactura:Date;
    fPago:Date;
    estado:boolean;
    importe:number;
    rolPago:Rol;
    viajePago:Viaje;
    cuentaBancaria:CuentaBancaria;

    constructor(pid:number,fFactura:Date,fPago:Date,estado:boolean,importe:number,rolPago:Rol,viajePago:Viaje,cuentaBancaria:CuentaBancaria){
        this.pid = pid;
        this.fFactura = fFactura;
        this.fPago = fPago;
        this.estado = estado;
        this.importe = importe;
        this.rolPago = rolPago;
        this.viajePago = viajePago;
        this.cuentaBancaria = cuentaBancaria;
    }
}