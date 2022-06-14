
export class NuevaNotificacion{
    nombre:string;
    fecha:Date;
    idUsuario:number;
    idGravedad:number;

    constructor(
        nombre:string,
        fecha:Date,
        idUsuario:number,
        idGravedad:number
    ){
        this.nombre = nombre;
        this.fecha = fecha;
        this.idUsuario = idUsuario;
        this.idGravedad = idGravedad;
    }
}