import { Remolque } from "./remolque";
import { Viaje } from "./viaje";

export class TipoRemolque {
    id:number;
    nombre:string;
    remolques:Array<Remolque>;
    viajes:Array<Viaje>;

    constructor(
        id:number,
        nombre:string,
    ){
        this.id = id;
        this.nombre = nombre;
        this.remolques = [];
        this.viajes = [];
    }
}
