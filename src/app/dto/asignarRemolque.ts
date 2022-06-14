import { Remolque } from "../models/remolque";

export class AsignarRemolque{
    idViaje:number;
    remolque:Remolque;

    constructor(
        idViaje:number,
        remolque:Remolque
    ){
        this.idViaje = idViaje;
        this.remolque = remolque;
    }
}