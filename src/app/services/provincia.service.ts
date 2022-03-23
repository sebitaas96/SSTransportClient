import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia';

@Injectable()
export class ProvinciaService {

  private provinciasUrl: string;

  constructor(private http: HttpClient) { 
    this.provinciasUrl = 'http://localhost:8080/provincias';
  }

  public findAll(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.provinciasUrl);
  }

  public save(provincia: Provincia) {
    return this.http.post<Provincia>(this.provinciasUrl, provincia);
  }
}
