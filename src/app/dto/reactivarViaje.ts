export class ReactivarViaje{
    idViaje:number;
    fInicio:Date;
    fFin:Date;

    constructor(idViaje:number,fInicio:Date,fFin:Date){
        this.idViaje = idViaje;
        this.fInicio =fInicio;
        this.fFin = fFin;
    }
}