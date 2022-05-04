import { Direccion } from "./direccion";
import { Localidad } from "./localidad";
import { Pais } from "./pais";
import { Provincia } from "./provincia";
import { Transporte } from "./transporte";
import { Usuario } from "./usuario";
import { Viaje } from "./viaje";
import { CuentaBancaria } from "./cuenta-bancaria";
import { Camion } from "./camion";
import { Remolque } from "./remolque";


export class Conductor extends Usuario{

    apellido:string;
    estado:boolean;
    conductorDeTransporte:Transporte;
    viajes:Array<Viaje>;
    camiones:Array<Camion>;
    remolques:Array<Remolque>

    constructor(
        id:number,
        nombre:string,
        apellido:string,
        nombreUsuario:string,
        password:string,
        documento:string,
        email:string,
        telefono:string,
        estado:boolean,
        conductorDeTransporte:Transporte,
        residenteDeDireccion:Direccion|null,
        operadorDeProvincia:Provincia|null,
        cuentaBancaria:CuentaBancaria|null,
    ){
        super(id , nombre ,nombreUsuario,password, documento , email , telefono , residenteDeDireccion , operadorDeProvincia,cuentaBancaria);
        this.apellido = apellido;
        this.estado = estado;
        this.conductorDeTransporte = conductorDeTransporte;
        this.viajes = [];
        this.camiones = [];
        this.remolques = [];
    }



}
