import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais';

@Injectable()
export class PaisService {

  private paisesUrl: string;

  constructor(private http: HttpClient) { 
    this.paisesUrl = 'http://localhost:8080/paises';
  }

  public findAll(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.paisesUrl);
  }

  public save(pais: Pais) {
    return this.http.post<Pais>(this.paisesUrl, pais);
  }
}
