import { Empresa } from "./empresa";
import { Direccion } from "./direccion";
import { Provincia } from "./provincia";
import { CuentaBancaria } from "./cuenta-bancaria";
import { Conductor } from "./conductor";
import { Camion } from "./camion";
import { Remolque } from "./remolque";
import { Pago } from "./pago";
import { Viaje } from "./viaje";
import { Rol } from "./rol";


export class Transporte extends Empresa {
    
    conductores:Array<Conductor>;
    camiones:Array<Camion>;
    remolques:Array<Remolque>;
    pagos:Array<Pago>;
    viajes:Array<Viaje>;

    constructor(
        id:number,
        nombre:string,
        documento:string,
        email:string,
        telefono:string,
        residenteDeDireccion:Direccion,
        operadorDeProvincia:Provincia,
        cuentaBancaria:CuentaBancaria,
        empresaDeRol:Rol
    ){
        super(id , nombre , documento , email , telefono , residenteDeDireccion , operadorDeProvincia,empresaDeRol, cuentaBancaria);
        this.conductores = [];
        this.camiones = [];
        this.remolques = [];
        this.pagos = [];
        this.viajes = [];

    }

}
