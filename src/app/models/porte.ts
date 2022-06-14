import { Usuario } from "./usuario";
import { Direccion } from "./direccion";
import { Provincia } from "./provincia";
import { Expedidor } from "./expedidor";
import { CuentaBancaria } from "./cuenta-bancaria";



export class Porte extends Usuario {
    
    expedirores:Array<Expedidor>;


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
        cuentaBancaria:CuentaBancaria|null,
    ){
        super(id , nombre ,nombreUsuario,password, documento , email , telefono ,activo, residenteDeDireccion , operadorDeProvincia,cuentaBancaria);
        this.expedirores = [];
    }

}
