
import { Usuario } from "./usuario";
import { Localidad } from "./localidad";
import { Viaje } from "./viaje";

export class Direccion {
    id:number;
    tipo:string;
    nombre:string;
    numero:number;
    direccionDeLocalidad:Localidad;
    recogidas:Array<Viaje>;
    entregas:Array<Viaje>;
    residentes:Array<Usuario>;

    constructor(
        id:number,
        tipo:string,
        nombre:string,
        numero:number,
        direccionDeLocalidad:Localidad,
    )
    {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.numero = numero;
        this.direccionDeLocalidad = direccionDeLocalidad;
        this.recogidas = [];
        this.entregas = [];
        this.residentes = [];
    }
}
