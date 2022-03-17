import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localidad } from '../models/localidad';

@Injectable()
export class LocalidadService {

  private localidadesUrl: string;

  constructor(private http: HttpClient) { 
    this.localidadesUrl = 'http://localhost:8080/localidades';
  }

  public findAll(): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.localidadesUrl);
  }

  public save(localidad: Localidad) {
    return this.http.post<Localidad>(this.localidadesUrl, localidad);
  }
}
