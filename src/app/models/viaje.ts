import { Camion } from "./camion";
import { Direccion } from "./direccion";
import { Estado } from "./estado";
import { Pago } from "./pago";
import { Rol } from "./rol";
import { TipoRemolque } from "./tipoRemolque";

export class Viaje {
    vid:number;
    precio:number;
    fHoraInicio:Date;
    fHoraFin:Date;
    duracion:number;
    viajeRol:Rol;
    tipoEstado:Estado;
    entregaDireccion:Direccion;
    recogidaDireccion:Direccion;
    usaTipoRemolque:TipoRemolque;
    camion:Camion;
    pagoDelViaje:Pago;

    constructor(vid:number,precio:number,fHoraInicio:Date,fHoraFin:Date,duracion:number,viajeRol:Rol,tipoEstado:Estado,entregaDireccion:Direccion,recogidaDireccion:Direccion,usaTipoRemolque:TipoRemolque,camion:Camion,pagoDelViaje:Pago){
        this.vid = vid;
        this.precio = precio;
        this.fHoraInicio = fHoraInicio;
        this.fHoraFin = fHoraFin;
        this.duracion = duracion;
        this.viajeRol = viajeRol;
        this.tipoEstado = tipoEstado;
        this.entregaDireccion = entregaDireccion;
        this.recogidaDireccion = recogidaDireccion;
        this.usaTipoRemolque = usaTipoRemolque;
        this.camion = camion;
        this.pagoDelViaje = pagoDelViaje;
    }
}