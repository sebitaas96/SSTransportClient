import { Provincia } from "./provincia";

export class Pais {
    id:number;
    nombre:string;
    provincias:Array<Provincia>;

    constructor(
        id:number,
        nombre:string
    )
    {
        this.id = id;
        this.nombre = nombre;
        this.provincias = [];
    }

}
