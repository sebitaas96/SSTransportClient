import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mensaje } from '../models/mensaje';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {


  private mensajeUrl = environment.mensajeUrl;

  constructor(private httpClient: HttpClient) { }

  public sendMenssage(mensaje: Mensaje): Observable<any> {
    return this.httpClient.post<any>(this.mensajeUrl + '/nuevo', mensaje);
  }
}
