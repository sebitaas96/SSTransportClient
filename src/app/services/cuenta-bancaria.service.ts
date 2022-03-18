import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuentaBancaria } from '../models/cuentaBancaria';

@Injectable()
export class CuentaBancariaService {

  private cuentasUrl : string;

  constructor(private http: HttpClient) { 
    this.cuentasUrl = 'http://localhost:8080/cuentas';
  }

  public findAll(): Observable<CuentaBancaria[]> {
    return this.http.get<CuentaBancaria[]>(this.cuentasUrl);
  }

  public save(cuenta: CuentaBancaria) {
    return this.http.post<CuentaBancaria>(this.cuentasUrl, cuenta);
  }
}
