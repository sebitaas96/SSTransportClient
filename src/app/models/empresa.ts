import { Provincia } from "./provincia";
import { Direccion } from "./direccion";
import { CuentaBancaria } from "./cuenta-bancaria";
import { Rol } from "./rol";

export class Empresa {
    id:number;
    nombre:string;
    documento:string;
    email:string;
    telefono:string;
    residenteDeDireccion:Direccion;
    operadorDeProvincia:Provincia;
    empresaDeRol:Rol;
    cuentaBancaria:CuentaBancaria|null;

    constructor(    
        id:number,
        nombre:string,
        documento:string,
        email:string,
        telefono:string,
        residenteDeDireccion:Direccion,
        operadorDeProvincia:Provincia,
        empresaDeRol:Rol,
        cuentaBancaria:CuentaBancaria|null)
        {
            this.id = id;
            this.nombre = nombre;
            this.documento = documento;
            this.email = email;
            this.telefono = telefono;
            this.residenteDeDireccion = residenteDeDireccion;
            this.operadorDeProvincia = operadorDeProvincia;
            this.empresaDeRol = empresaDeRol;
            this.cuentaBancaria = cuentaBancaria;
        }



}
