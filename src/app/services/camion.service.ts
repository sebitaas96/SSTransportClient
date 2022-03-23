import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camion } from '../models/camion';

@Injectable()
export class CamionService {

  private camionesUrl: string;

  constructor(private http: HttpClient) { 
    this.camionesUrl = 'http://localhost:8080/camiones';
  }

  public findAll(): Observable<Camion[]> {
    return this.http.get<Camion[]>(this.camionesUrl);
  }

  public save(camion: Camion) {
    return this.http.post<Camion>(this.camionesUrl, camion);
  }
}
