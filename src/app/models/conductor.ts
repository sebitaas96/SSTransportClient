import { Direccion } from "./direccion";
import { Localidad } from "./localidad";
import { Pais } from "./pais";
import { Provincia } from "./provincia";
import { Transporte } from "./transporte";
import { Usuario } from "./usuario";
import { Viaje } from "./viaje";
import { CuentaBancaria } from "./cuenta-bancaria";


export class Conductor extends Usuario{

    apellidos:string;
    conductorDeTransporte:Transporte;
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
        conductorDeTransporte:Transporte,
        residenteDeDireccion:Direccion,
        operadorDeProvincia:Provincia,
        cuentaBancaria:CuentaBancaria|null,
    ){
        super(id , nombre ,nombreUsuario,password, documento , email , telefono , residenteDeDireccion , operadorDeProvincia,cuentaBancaria);
        this.apellidos = apellidos;
        this.conductorDeTransporte = conductorDeTransporte;
        this.viajes = [];
    }



}
