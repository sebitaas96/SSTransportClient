import { Usuario } from "./usuario";

export class CuentaBancaria {
    id:number;
    nombreTitular:string;
    cSwiftBic:string;
    IBAN:string;
    cuentaUsuario:Usuario;
    //Faltan las que le vienen del pago

    constructor(id:number,nombreTitular:string,cSwiftBic:string,IBAN:string,cuentaUsuario:Usuario){
        this.id = id;
        this.nombreTitular = nombreTitular;
        this.cSwiftBic = cSwiftBic;
        this.IBAN = IBAN;
        this.cuentaUsuario = cuentaUsuario;
    }
}