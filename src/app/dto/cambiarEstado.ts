export class CambiarEstado {
    estado: boolean
    id: number;

    constructor(
        estado: boolean,
        id: number
    ) {
        this.estado = estado;
        this.id = id;
    }
}