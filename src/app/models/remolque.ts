import { Conductor } from "./conductor";
import { TipoRemolque } from "./tipo-remolque";
import { Transporte } from "./transporte";

export class Remolque {
    id:number;
    matricula:string;
    estado:boolean;
    remolqueDeTransporte:Transporte|null;
    remolqueDeConductor:Conductor|null;
    remolqueDeTipoRemolque:TipoRemolque;

    constructor(
        id:number,
        matricula:string,
        estado:boolean,
        remolqueDeTransporte:Transporte|null,
        remolqueDeConductor:Conductor|null,
        remolqueDeTipoRemolque:TipoRemolque
    ){
        this.id = id;
        this.matricula = matricula;
        this.estado = estado;
        this.remolqueDeTransporte = remolqueDeTransporte;
        this.remolqueDeConductor = remolqueDeConductor;
        this.remolqueDeTipoRemolque = remolqueDeTipoRemolque;
    }
}
