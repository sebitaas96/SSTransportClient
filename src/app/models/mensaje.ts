import { Transporte } from "./transporte";

export class Email {
    destinatario:string;
    texto:string;
    asunto:string;
    url:string;
    invitacionDeTransporte:Transporte;
    

    constructor(destinatario:string,
        asunto:string,
        texto:string,
        url:string,
        invitacionDeTransporte:Transporte
        ){
        this.destinatario = destinatario;
        this.texto = texto;
        this.asunto = asunto;
        this.url = url;
        this.invitacionDeTransporte = invitacionDeTransporte;
    }
}