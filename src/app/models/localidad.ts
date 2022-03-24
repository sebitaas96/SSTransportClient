import { Provincia } from "./provincia";
import { Direccion } from "./direccion";

export class Localidad {
    id:number;
    nombre:string;
    cp:number;
    localidadDeProvincia:Provincia;
    direcciones:Array<Direccion>;

    constructor(
        id:number,
        nombre:string,
        cp:number,
        localidadDeProvincia:Provincia
    ){
        this.id = id;
        this.nombre = nombre;
        this.cp = cp;
        this.localidadDeProvincia = localidadDeProvincia;
        this.direcciones = [];
    }
}
