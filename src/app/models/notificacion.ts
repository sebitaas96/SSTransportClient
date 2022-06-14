
import {Usuario} from './usuario';
import {Gravedad} from './gravedad';

export class Notificacion {
    id:number;
    nombre:string;
    fecha:Date;
    notificacionDeUsuario:Usuario;
    notificacionDeGravedad:Gravedad;

    constructor(
        id:number,
        nombre:string,
        fecha:Date,
        notificacionDeUsuario:Usuario,
        notificacionDeGravedad:Gravedad
    ){
        this.id = id;
        this.nombre = nombre;
        this.fecha = fecha;
        this.notificacionDeUsuario = notificacionDeUsuario;
        this.notificacionDeGravedad = notificacionDeGravedad;
    }
}