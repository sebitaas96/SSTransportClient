import { CuentaBancaria } from "../models/cuenta-bancaria";

export class addCuenta {
    cuentaBancaria:CuentaBancaria;
    idUsuario:number;
    
    

    constructor(
        cuentaBancaria:CuentaBancaria,
        idUsuario:number
        ){
            this.cuentaBancaria = cuentaBancaria;
            this.idUsuario = idUsuario;
    }
}