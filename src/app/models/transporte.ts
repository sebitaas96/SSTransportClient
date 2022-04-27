import { Usuario } from "./usuario";
import { Direccion } from "./direccion";
import { Provincia } from "./provincia";
import { CuentaBancaria } from "./cuenta-bancaria";
import { Conductor } from "./conductor";
import { Camion } from "./camion";
import { Remolque } from "./remolque";
import { Pago } from "./pago";
import { Viaje } from "./viaje";



export class Transporte extends Usuario {
    
    conductores:Array<Conductor>;
    camiones:Array<Camion>;
    remolques:Array<Remolque>;
    pagos:Array<Pago>;
    viajes:Array<Viaje>;

    constructor(
        id:number,
        nombre:string,
        nombreUsuario:string,
        password:string,
        documento:string,
        email:string,
        telefono:string,
        residenteDeDireccion:Direccion|null,
        operadorDeProvincia:Provincia|null,
        cuentaBancaria:CuentaBancaria|null,
    ){
        super(id , nombre ,nombreUsuario,password, documento , email , telefono , residenteDeDireccion , operadorDeProvincia,cuentaBancaria);
        this.conductores = [];
        this.camiones = [];
        this.remolques = [];
        this.pagos = [];
        this.viajes = [];

    }

}
