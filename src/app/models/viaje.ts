import { Provincia } from "./provincia";
import { Direccion } from "./direccion";
import { Transporte } from "./transporte";
import { Expedidor } from "./expedidor";
import { Conductor } from "./conductor";
import { TipoCamion } from "./tipo-camion";
import { TipoRemolque } from "./tipo-remolque";
import { Pago } from "./pago";
import { Estado } from "./estado";
import { Porte } from "./porte";

export class Viaje {
    id:number;
    descripcion:string;
    precio:number;
    distancia:number;
    tiempo:number;
    fHoraInicio:Date;
    fHoraFin:Date;
    recogidaDeDireccion:Direccion;
    entregaDeDireccion:Direccion;
    viajeDeTransporte:Transporte|null;
    viajeDePorte:Porte|null;
    viajeDeExpedidor:Expedidor|null;
    viajeDeConductor:Conductor|null;
    viajeDeTipoCamion:TipoCamion;
    viajeDeTipoRemolque:TipoRemolque|null;
    pago:Pago|null;
    viajeDeEstado:Estado;

    constructor(
        id:number,
        descripcion:string,
        precio:number,
        distancia:number,
        tiempo:number,
        fHoraInicio:Date,
        fHoraFin:Date,
        recogidaDeDireccion:Direccion,
        entregaDeDireccion:Direccion,
        viajeDeTransporte:Transporte|null,
        viajeDePorte:Porte|null,
        viajeDeExpedidor:Expedidor|null,
        viajeDeConductor:Conductor|null,
        viajeDeTipoCamion:TipoCamion,
        viajeDeTipoRemolque:TipoRemolque|null,
        pago:Pago|null,
        viajeDeEstado:Estado
    )
        {
            this.id = id;
            this.descripcion = descripcion;
            this.precio = precio;
            this.distancia = distancia;
            this.tiempo = tiempo;
            this.fHoraInicio = fHoraInicio;
            this.fHoraFin = fHoraFin;
            this.recogidaDeDireccion = recogidaDeDireccion;
            this.entregaDeDireccion = entregaDeDireccion;
            this.viajeDeTransporte = viajeDeTransporte;
            this.viajeDePorte = viajeDePorte;
            this.viajeDeExpedidor = viajeDeExpedidor;
            this.viajeDeConductor = viajeDeConductor;
            this.viajeDeTipoCamion = viajeDeTipoCamion;
            this.viajeDeTipoRemolque = viajeDeTipoRemolque;
            this.pago = pago;
            this.viajeDeEstado = viajeDeEstado;
        }

}
