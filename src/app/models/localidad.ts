import { Provincia } from "./provincia";

export class Localidad {
    id:string;
    nombre:string;
    localidadDeProvincia:Provincia;

    constructor(id:string,nombre:string,localidadDeProvincia:Provincia){
        this.id = id;
        this.nombre = nombre;
        this.localidadDeProvincia = localidadDeProvincia;
    }
}