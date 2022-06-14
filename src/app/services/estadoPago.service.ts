import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';
import { EstadoPago } from '../models/estadoPago';

@Injectable({
  providedIn: 'root'
})
export class EstadopagoService {

  private estadoPagoUrl = environment.estadoPagoUrl;

  constructor(
    private http:HttpClient
  ) { }

  public findAll():Observable<EstadoPago[]>{
    return this.http.get<EstadoPago[]>(this.estadoPagoUrl+'/findAll');
  }


}
