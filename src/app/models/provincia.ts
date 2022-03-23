
import { Empresa } from "./empresa";
import { Pais } from "./pais";
import { Localidad } from "./localidad";

export class Provincia {
    id:number;
    nombre:string;
    provinciaDePais:Pais;
    localidades:Array<Localidad>;
    operadores:Array<Empresa>;

    constructor(
        id:number,
        nombre:string,
        provinciaDePais:Pais,
    ){
        this.id = id;
        this.nombre = nombre;
        this.provinciaDePais = provinciaDePais;
        this.localidades = [];
        this.operadores = [];
    }

}
