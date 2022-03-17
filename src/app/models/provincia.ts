import { Pais } from "./pais";

export class Provincia {
    id:string;
    nombre:string;
    provinciaDePais:Pais;

    constructor(id:string,nombre:string,provinciaDePais:Pais){
        this.id = id;
        this.nombre = nombre;
        this.provinciaDePais = provinciaDePais;
    }
}