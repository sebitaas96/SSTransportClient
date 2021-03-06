import { Usuario } from "./usuario";

export class CuentaBancaria {
    id:number;
    nombreTitular:string;
    swiftBic:string;
    iban:string;
    usuario:Usuario|null;

    constructor(
        id:number,
        nombreTitular:string,
        swiftBic:string,
        iban:string,
        usuario:Usuario|null
    )
    {
        this.id = id;
        this.nombreTitular = nombreTitular;
        this.swiftBic = swiftBic;
        this.iban = iban;
        this.usuario = usuario;
    }
}
