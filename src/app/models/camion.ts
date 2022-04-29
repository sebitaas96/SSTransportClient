import { Conductor } from "./conductor";
import { TipoCamion } from "./tipo-camion";
import { Transporte } from "./transporte";

export class Camion {
    id:number;
    matricula:string;
    estado:boolean;
    camionDeTransporte:Transporte;
    camionDeConductor:Conductor;
    camionDeTipoCamion:TipoCamion;

    constructor(
        id:number,
        matricula:string,
        estado:boolean,
        camionDeTransporte:Transporte,
        camionDeConductor:Conductor,
        camionDeTipoCamion:TipoCamion
    ){
        this.id= id;
        this.matricula = matricula;
        this.estado = estado;
        this.camionDeTransporte = camionDeTransporte;
        this.camionDeConductor = camionDeConductor;
        this.camionDeTipoCamion = camionDeTipoCamion;
    }

}
