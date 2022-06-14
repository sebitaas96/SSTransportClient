
export class UpdateFecha{
    idViaje:number;
    fecha:Date;

    constructor(
        idViaje:number,
        fecha:Date
    ){
        this.idViaje = idViaje;
        this.fecha = fecha;
    }
}