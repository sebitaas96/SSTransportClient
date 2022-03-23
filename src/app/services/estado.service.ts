import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';

@Injectable()
export class EstadoService {

  private estadosUrl: string;

  constructor(private http: HttpClient) { 
    this.estadosUrl = 'http://localhost:8080/estados';
  }

  public findAll(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.estadosUrl);
  }

  public save(estado: Estado) {
    return this.http.post<Estado>(this.estadosUrl, estado);
  }
}
