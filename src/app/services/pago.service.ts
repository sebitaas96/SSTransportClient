import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable()
export class PagoService {

  private pagosUrl: string;

  constructor(private http: HttpClient) { 
    this.pagosUrl = 'http://localhost:8080/pagos';
  }

  public findAll(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.pagosUrl);
  }

  public save(pago: Pago) {
    return this.http.post<Pago>(this.pagosUrl, pago);
  }
}
