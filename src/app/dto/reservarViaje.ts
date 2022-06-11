import {Transporte} from "../models/transporte";
import { Conductor } from "../models/conductor";

export class ReservarViaje{
    idViaje:number;
    transporte:Transporte
    conductor:Conductor|null

    constructor(
        idViaje:number,
        transporte:Transporte,
        conductor:Conductor|null
    ){
        this.idViaje = idViaje;
        this.transporte = transporte;
        this.conductor = conductor;
    }
}