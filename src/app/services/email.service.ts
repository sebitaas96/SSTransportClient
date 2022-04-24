import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {


  private emailUrl = environment.emailUrl;

  constructor(private httpClient: HttpClient) { }

  public sendMenssage(email: Email): Observable<any> {
    return this.httpClient.post<any>(this.emailUrl + '/nuevo', email);
  }

  public deOfuscarMensaje(email:string):Observable<Email>{
    return this.httpClient.get<Email>(this.emailUrl+'/'+email+'/deofuscar')
  }

  public findAllEmails(idEmpresa:number):Observable<Email[]>{
    return this.httpClient.get<Email[]>(this.emailUrl+'/'+idEmpresa+'/findAll'); 
  }

  public deleteEmail(idEmail:number): Observable<any>{
    return this.httpClient.delete<any>(this.emailUrl+'/'+idEmail+'/deleteEmail');
  }
}
