export class JwtDto {

    token :string;
    type:string;
    nombreUsuario:string;
    authorities:Array<string>;

    constructor(token:string , type:string , nombreUsuario:string){
        this.token = token;
        this.type = type;
        this.nombreUsuario = nombreUsuario;
        this.authorities = [];
    }

}
