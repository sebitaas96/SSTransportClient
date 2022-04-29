import { Viaje } from "./viaje";

export class Estado {
    id:number;
    nombre:string;
    viajes:Array<Viaje>;

    constructor(
        id:number,
        nombre:string
    ){
        this.id = id;
        this.nombre = nombre;
        this.viajes = [];
    }
}
