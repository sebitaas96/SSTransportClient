import { Usuario } from "./usuario";


export class CuentaBancaria {
    id:number;
    cSwiftBic:string;
    iban:String;


    constructor(
        id:number,
        cSwiftBic:string,
        iban:String,
    )
    {
        this.id = id;
        this.cSwiftBic = cSwiftBic;
        this.iban = iban;
    }
}
