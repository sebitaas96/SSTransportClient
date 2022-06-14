import { Conductor } from "../models/conductor";

export class AsignarConductor{
    idViaje:number;
    conductor:Conductor;

    constructor(
        idViaje:number,
        conductor:Conductor
    ){
        this.idViaje = idViaje;
        this.conductor = conductor;
    }
}