
import { Usuario } from "./usuario";

export class Rol {
    id:number;
    nombre:string;
    usuarios:Array<Usuario>;

    constructor(id:number, nombre:string){
        this.id = id;
        this.nombre = nombre;
        this.usuarios = [];
    }
}
