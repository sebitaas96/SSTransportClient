import { Pago } from "./pago";

export class EstadoPago{
    id:number;
    nombre:string;
    pagos:Array<Pago>;

    constructor(
        id:number,
        nombre:string
    ){
        this.id = id;
        this.nombre = nombre;
        this.pagos = [];
    }

}