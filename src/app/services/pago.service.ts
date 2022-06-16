import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PagosEstado } from '../dto/pagosEstado';
import { EstadoPago } from '../models/estadoPago';
import {Pago} from '../models/pago';

@Injectable({
    providedIn: 'root'
})

  export class PagoService {

    private pagoUrl  = environment.pagoUrl;

    constructor(private http:HttpClient){

    }


    public generarPago(idViaje:number):Observable<any>{
      return this.http.post<any>(this.pagoUrl+'/nuevoPago',idViaje);
    }

    public realizarPago(idPago:number):Observable<any>{
      return this.http.put<any>(this.pagoUrl+'/realizarPago',idPago);
    }

    public rechazarPago(idPago:number):Observable<any>{
      return this.http.put<any>(this.pagoUrl+'/rechazarPago',idPago);
    }
    public disputarPago(idPago:number):Observable<any>{
      return this.http.put<any>(this.pagoUrl+'/disputarPago',idPago);
    }
    
    public findAllPorte(idPorte:number):Observable<Pago[]>{
        return this.http.get<Pago[]>(this.pagoUrl+'/'+idPorte+'/findAllPorte');
    }

    public findAllTransporte(idTransporte:number):Observable<Pago[]>{
      return this.http.get<Pago[]>(this.pagoUrl+'/'+idTransporte+'/findAllTransporte');
  }

  public findAllFiltrado(pagosEstado:PagosEstado ):Observable<Pago[]>{
    return this.http.post<Pago[]>(this.pagoUrl +'/findAllFiltrado' , pagosEstado);
  }

  public findPago(idPago:number):Observable<Pago>{
    return this.http.get<Pago>(this.pagoUrl+'/'+idPago+'/findPago');
}

  }