import { Provincia } from "./provincia";
import { Direccion } from "./direccion";
import { Transporte } from "./transporte";
import { Expedidor } from "./expedidor";
import { Conductor } from "./conductor";
import { TipoCamion } from "./tipo-camion";
import { TipoRemolque } from "./tipo-remolque";
import { Pago } from "./pago";
import { Estado } from "./estado";

export class Viaje {
    id:number;
    vId:string;
    descripcion:string;
    precio:number;
    fHoraInicio:Date;
    fHoraFin:Date;
    recogidaDeDireccion:Direccion;
    entregaDeDireccion:Direccion;
    viajeDeTransporte:Transporte;
    viajeDeExpedidor:Expedidor;
    viajeDeConductor:Conductor;
    viajeDeTipoCamion:TipoCamion;
    viajeDeTipoRemolque:TipoRemolque;
    pago:Pago;
    viajeDeEstado:Estado;

    constructor(
        id:number,
        vId:string,
        descripcion:string,
        precio:number,
        fHoraInicio:Date,
        fHoraFin:Date,
        recogidaDeDireccion:Direccion,
        entregaDeDireccion:Direccion,
        viajeDeTransporte:Transporte,
        viajeDeExpedidor:Expedidor,
        viajeDeConductor:Conductor,
        viajeDeTipoCamion:TipoCamion,
        viajeDeTipoRemolque:TipoRemolque,
        pago:Pago,
        viajeDeEstado:Estado
    )
        {
            this.id = id;
            this.vId = vId;
            this.descripcion = descripcion;
            this.precio = precio;
            this.fHoraInicio = fHoraInicio;
            this.fHoraFin = fHoraFin;
            this.recogidaDeDireccion = recogidaDeDireccion;
            this.entregaDeDireccion = entregaDeDireccion;
            this.viajeDeTransporte = viajeDeTransporte;
            this.viajeDeExpedidor = viajeDeExpedidor;
            this.viajeDeConductor = viajeDeConductor;
            this.viajeDeTipoCamion = viajeDeTipoCamion;
            this.viajeDeTipoRemolque = viajeDeTipoRemolque;
            this.pago = pago;
            this.viajeDeEstado = viajeDeEstado;
        }

}
