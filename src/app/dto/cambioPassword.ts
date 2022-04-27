export class CambioPassword {
    pwd_vieja:string;
    pwd_nueva:string;
    pwd_nuevar:string;
    id_usuario:number;
    
    

    constructor(
        pwd_vieja:string,
        pwd_nueva:string,
        pwd_nuevar:string,
        id_usuario:number,
        ){
            this.pwd_vieja = pwd_vieja;
            this.pwd_nueva = pwd_nueva;
            this.pwd_nuevar = pwd_nuevar;
            this.id_usuario = id_usuario;
    }
}