import { CuentaBancaria } from "./cuentaBancaria";
import { Direccion } from "./direccion";
import { Provincia } from "./provincia";
import { Rol } from "./rol";

export class Usuario {
    id:number;
    nombre:string;
    apellido:string;
    documento:string;
    email:string;
    telefono:number;
    nombreRol:Rol;
    provinciaOpera:Provincia;
    direccionReside:Direccion;
    cuentaBancaria:CuentaBancaria;


    constructor(id:number,nombre:string,apellido:string,documento:string,email:string,telefono:number,nombreRol:Rol,provinciaOpera:Provincia,direccionReside:Direccion,cuentaBancaria:CuentaBancaria){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.email = email;
        this.telefono = telefono;
        this.nombreRol = nombreRol;
        this.provinciaOpera = provinciaOpera;
        this.direccionReside = direccionReside;
        this.cuentaBancaria = cuentaBancaria;
    }
}