export class PagosEstado{
    idEmpresa:number;
    estadoPago:string;

    constructor(
        idEmpresa:number,
        estadoPago:string
    ){
        this.idEmpresa = idEmpresa;
        this.estadoPago = estadoPago;
    }
}