import { Provincia } from "./provincia";
import { Direccion } from "./direccion";
import { CuentaBancaria } from "./cuenta-bancaria";

export class Usuario {
    id:number;
    nombre:string;
    nombreUsuario:string;
    password:string;
    documento:string;
    email:string;
    telefono:string;
    residenteDeDireccion:Direccion;
    operadorDeProvincia:Provincia;
    authorities:String[];
    cuentaBancaria:CuentaBancaria|null;

    constructor(    
        id:number,
        nombre:string,
        nombreUsuario:string,
        password:string,
        documento:string,
        email:string,
        telefono:string,
        residenteDeDireccion:Direccion,
        operadorDeProvincia:Provincia,
        cuentaBancaria:CuentaBancaria|null)
        {
            this.id = id;
            this.nombre = nombre;
            this.nombreUsuario = nombreUsuario;
            this.password = password;
            this.documento = documento;
            this.email = email;
            this.telefono = telefono;
            this.residenteDeDireccion = residenteDeDireccion;
            this.operadorDeProvincia = operadorDeProvincia;
            this.authorities = [];
            this.cuentaBancaria = cuentaBancaria;
        }



}