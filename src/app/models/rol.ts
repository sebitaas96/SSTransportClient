import { Conductor } from "./conductor";
import { Empresa } from "./empresa";

export class Rol {
    id:number;
    nombre:string;
    empresas:Array<Empresa>;
    conductores:Array<Conductor>;

    constructor(id:number, nombre:string){
        this.id = id;
        this.nombre = nombre;
        this.empresas = [];
        this.conductores = [];
    }
}
