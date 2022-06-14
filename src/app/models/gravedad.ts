export class Gravedad {
    id:number;
    nombre:string;
    notificaciones:Array<Notification>;

    constructor(
        id:number,
        nombre:string
    ){
        this.id = id;
        this.nombre = nombre;
        this.notificaciones = [];
    }
}