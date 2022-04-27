import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CuentaBancaria } from '../models/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  private cuentaBancariaUrl = environment.cuentaBancariaUrl;

  constructor(private http: HttpClient) { 

  }

  public findCuenta(idCuenta:number):Observable<CuentaBancaria>{
    return this.http.get<CuentaBancaria>(this.cuentaBancariaUrl+'/'+idCuenta+'/findCuenta');
  }

  public createCuenta(cuentaBancaria:CuentaBancaria):Observable<CuentaBancaria>{
    return this.http.post<CuentaBancaria>(this.cuentaBancariaUrl+'/createCuenta' , cuentaBancaria);
  }

  public updateCuenta(cuentaBancaria:CuentaBancaria):Observable<any>{
    return this.http.put<CuentaBancaria>(this.cuentaBancariaUrl+'/updateCuenta' , cuentaBancaria);
  }
}
