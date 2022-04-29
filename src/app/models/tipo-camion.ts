import { Camion } from "./camion";
import { Viaje } from "./viaje";

export class TipoCamion {

    id:number;
    nombre:string;
    enganche:boolean;
    camiones:Array<Camion>;
    viajes:Array<Viaje>;

    constructor(
        id:number,
        nombre:string,
        enganche:boolean,
    ){

        this.id = id;
        this.nombre = nombre;
        this.enganche = enganche;
        this.camiones = [];
        this.viajes = [];
    }
}
