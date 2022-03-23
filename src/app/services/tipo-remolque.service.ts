import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoRemolque } from '../models/tipoRemolque';

@Injectable()
export class TipoRemolqueService {

  private tiposRemolqueUrl: string;

  constructor(private http: HttpClient) { 
    this.tiposRemolqueUrl = 'http://localhost:8080/tiposRemolque';
  }

  public findAll(): Observable<TipoRemolque[]> {
    return this.http.get<TipoRemolque[]>(this.tiposRemolqueUrl);
  }

  public save(tipoRemolque: TipoRemolque) {
    return this.http.post<TipoRemolque>(this.tiposRemolqueUrl, tipoRemolque);
  }
}
