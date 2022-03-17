import { Localidad } from "./localidad";

export class Direccion {
    id:number;
    nombre:string;
    direccionDeLocalidad:Localidad;

    constructor(id:number , nombre:string,direccionDeLocalidad:Localidad){
        this.id = id;
        this.nombre = nombre;
        this.direccionDeLocalidad = direccionDeLocalidad;
    }
}