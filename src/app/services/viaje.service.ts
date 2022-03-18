import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Viaje } from '../models/viaje';

@Injectable()
export class ViajeService {

  private viajesUrl : string;

  constructor(private http: HttpClient) { 
    this.viajesUrl = 'http://localhost:8080/viajes';
  }

  public findAll(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.viajesUrl);
  }

  public save(viaje: Viaje) {
    return this.http.post<Viaje>(this.viajesUrl, viaje);
  }
}
