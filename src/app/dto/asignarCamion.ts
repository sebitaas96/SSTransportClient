import { Camion } from "../models/camion";

export class AsignarCamion{
    idViaje:number;
    camion:Camion;

    constructor(
        idViaje:number,
        camion:Camion
    ){
        this.idViaje = idViaje;
        this.camion = camion;
    }
}