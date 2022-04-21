import { Provincia } from "./provincia";
import { Direccion } from "./direccion";

export class Viaje {
    id:number;
    descripcion:string;
    fHoraFin:Date;
    fHoraInicio:Date;
    precio:number;
    v:number;
    direccionEntrega:Direccion;
    operadorDeProvincia:Provincia;
    pago:number;
    direccionRecogida:Direccion;
    camionId:number;
    conductorId:number;
    estadoId:number;
    remolqueId:number;
    transporteId:number;

    constructor(
        id:number,
        descripcion:string,
        fHoraFin:Date,
        fHoraInicio:Date,
        precio:number,
        v:number,
        direccionEntrega:Direccion,
        operadorDeProvincia:Provincia,
        pago:number,
        direccionRecogida:Direccion,
        camionId:number,
        conductorId:number,
        estadoId:number,
        remolqueId:number,
        transporteId:number,
    )
        {
            this.id = id;
            this.descripcion = descripcion;
            this.fHoraFin = fHoraFin;
            this.fHoraInicio = fHoraInicio;
            this.precio = precio;
            this.v = v;
            this.direccionEntrega = direccionEntrega;
            this.pago = pago;
            this.operadorDeProvincia = operadorDeProvincia;
            this.direccionRecogida = direccionRecogida;
            this.camionId = camionId;
            this.conductorId = conductorId;
            this.estadoId = estadoId;
            this.remolqueId = remolqueId;
            this.transporteId = transporteId;
        }

}
