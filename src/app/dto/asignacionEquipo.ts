import { Conductor } from "../models/conductor";

export class asignacionEquipo {
    conductor:Conductor|null;
    idEquipo:number;
    

    constructor(
        conductor:Conductor|null,
        idEquipo:number
        ){
            this.conductor = conductor;
            this.idEquipo = idEquipo;
    }
}