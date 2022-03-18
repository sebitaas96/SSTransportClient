import { Pais } from "./pais";

export class Provincia {
    id:number;
    nombre:string;
    provinciaDePais:Pais;

    constructor(id:number,nombre:string,provinciaDePais:Pais){
        this.id = id;
        this.nombre = nombre;
        this.provinciaDePais = provinciaDePais;
    }
}