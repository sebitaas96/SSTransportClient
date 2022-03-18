import { Provincia } from "./provincia";

export class Localidad {
    id:number;
    nombre:string;
    localidadDeProvincia:Provincia;

    constructor(id:number,nombre:string,localidadDeProvincia:Provincia){
        this.id = id;
        this.nombre = nombre;
        this.localidadDeProvincia = localidadDeProvincia;
    }
}