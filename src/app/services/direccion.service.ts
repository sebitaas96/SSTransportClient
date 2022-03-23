import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Direccion } from '../models/direccion';

@Injectable()
export class DireccionService {

  private direccionesUrl: string;

  constructor(private http: HttpClient) { 
    this.direccionesUrl = 'http://localhost:8080/direcciones';
  }

  public findAll(): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.direccionesUrl);
  }

  public save(direccion: Direccion) {
    return this.http.post<Direccion>(this.direccionesUrl, direccion);
  }
}
