import { Usuario } from "./usuario";

export class Camion {
    id:number;
    matricula:string;
    estado:boolean;
    usuarioDelCamion:Usuario;

    constructor(id:number,matricula:string,estado:boolean,usuarioDelCamion:Usuario){
        this.id = id;
        this.matricula = matricula;
        this.estado = estado;
        this.usuarioDelCamion = usuarioDelCamion;
    }
}