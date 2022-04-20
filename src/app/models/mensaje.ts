export class Mensaje {
    destinatario:string;
    texto:string;
    asunto:string;
    

    constructor(destinatario:string,
        asunto:string,
        texto:string,
        ){
        this.destinatario = destinatario;
        this.texto = texto;
        this.asunto = asunto;
    }
}