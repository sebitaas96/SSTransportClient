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
    activo:boolean;
    residenteDeDireccion:Direccion|null;
    operadorDeProvincia:Provincia|null;
    authorities:String[];
    cuentaBancaria:CuentaBancaria|null;
    notificaciones:Array<Notification>;

    constructor(    
        id:number,
        nombre:string,
        nombreUsuario:string,
        password:string,
        documento:string,
        email:string,
        telefono:string,
        activo:boolean,
        residenteDeDireccion:Direccion|null,
        operadorDeProvincia:Provincia|null,
        cuentaBancaria:CuentaBancaria|null)
        {
            this.id = id;
            this.nombre = nombre;
            this.nombreUsuario = nombreUsuario;
            this.password = password;
            this.documento = documento;
            this.email = email;
            this.telefono = telefono;
            this.activo = activo
            this.residenteDeDireccion = residenteDeDireccion;
            this.operadorDeProvincia = operadorDeProvincia;
            this.authorities = [];
            this.cuentaBancaria = cuentaBancaria;
            this.notificaciones = [];
        }



}
