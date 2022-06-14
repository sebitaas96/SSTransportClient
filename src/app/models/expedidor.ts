import { Direccion } from "./direccion";
import { Provincia } from "./provincia";
import { Transporte } from "./transporte";
import { Usuario } from "./usuario";
import { Viaje } from "./viaje";
import { CuentaBancaria } from "./cuenta-bancaria";
import { Porte } from "./porte";


export class Expedidor extends Usuario{

    apellidos:string;
    expedidorDePorte:Porte;
    viajes:Array<Viaje>;

    constructor(
        id:number,
        nombre:string,
        apellidos:string,
        nombreUsuario:string,
        password:string,
        documento:string,
        email:string,
        telefono:string,
        activo:boolean,
        expedidorDePorte:Porte,
        residenteDeDireccion:Direccion|null,
        operadorDeProvincia:Provincia|null,
        cuentaBancaria:CuentaBancaria|null,
    ){
        super(id , nombre ,nombreUsuario,password, documento , email , telefono ,activo, residenteDeDireccion , operadorDeProvincia,cuentaBancaria);
        this.apellidos = apellidos;
        this.expedidorDePorte = expedidorDePorte;
        this.viajes = [];
    }



}
