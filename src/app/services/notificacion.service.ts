import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NuevaNotificacion } from '../dto/nuevaNotificacion';
import {Notificacion} from '../models/notificacion';

@Injectable({
    providedIn: 'root'
  })
  export class NotificacionService {
  
  
    private notificacionUrl = environment.notificacionUrl;
  
    constructor(private httpClient: HttpClient) { }
  
    
    public addNotificacion(nuevaNotificacion: NuevaNotificacion): Observable<any> {
      return this.httpClient.post<any>(this.notificacionUrl + '/addNotificacion', nuevaNotificacion);
    }

    public findAllUsuario(idUsuario:number):Observable<Notificacion[]>{
      return this.httpClient.get<Notificacion[]>(this.notificacionUrl+'/'+idUsuario+'/findAll');
    }

    public deleteNotificacion(idNotificacion:number): Observable<any>{
      return this.httpClient.delete<any>(this.notificacionUrl+'/'+idNotificacion+'/deleteNotificacion');
    }

  }
  