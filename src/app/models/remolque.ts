import { TipoRemolque } from "./tipoRemolque";
import { Usuario } from "./usuario";

export class Remolque {
    id:number;
    matricula:string;
    estado:boolean;
    usuarioDelRemolque:Usuario;
    tipoRemolque:TipoRemolque;

    constructor(id:number,matricula:string,estado:boolean,usuarioDelRemolque:Usuario,tipoRemolque:TipoRemolque){
        this.id = id;
        this.matricula = matricula;
        this.estado = estado;
        this.usuarioDelRemolque = usuarioDelRemolque;
        this.tipoRemolque = tipoRemolque;
    }
}