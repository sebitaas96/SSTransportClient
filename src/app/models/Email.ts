import { Porte } from "./porte";
import { Transporte } from "./transporte";

export class Email {
    id:number;
    destinatario:string;
    texto:string;
    asunto:string;
    url:string;
    invitacionDeTransporte:Transporte|null;
    invitacionDePorte:Porte|null;
    

    constructor(
        id:number,
        destinatario:string,
        asunto:string,
        texto:string,
        url:string,
        invitacionDeTransporte:Transporte|null,
        invitacionDePorte:Porte|null
        ){
        this.id=id;
        this.destinatario = destinatario;
        this.texto = texto;
        this.asunto = asunto;
        this.url = url;
        this.invitacionDeTransporte = invitacionDeTransporte;
        this.invitacionDePorte = invitacionDePorte;
    }
}