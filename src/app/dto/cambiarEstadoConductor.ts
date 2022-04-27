export class CambiarEstadoConductor {
    estado: boolean
    idConductor: number;

    constructor(
        estado: boolean,
        idConductor: number
    ) {
        this.estado = estado;
        this.idConductor = idConductor;
    }
}