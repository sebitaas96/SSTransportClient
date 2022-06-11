import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservarViaje } from '../dto/reservarViaje';
import { Viaje } from '../models/viaje';

@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private viajeUrl = environment.viajeUrl;

  constructor(private http:HttpClient){

  }

  public addViaje(viaje:Viaje):Observable<any>{
    return this.http.post<any>(this.viajeUrl+'/nuevo',viaje);
  }

  public findAll(idEmpresa:number):Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.viajeUrl+'/'+idEmpresa+'/findAll');
  }

  public findAllPanel():Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.viajeUrl+"/findAllPanel");
  }

  public findAllExpedidor(idExpedidor:number):Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.viajeUrl+'/'+idExpedidor+'/findAllExpedidor');
  }

  public findViajeId(idViaje:number):Observable<Viaje>{
    return this.http.get<Viaje>(this.viajeUrl+'/'+idViaje+'/findViajeId');
  }

  public reservarViaje(reservarViaje:ReservarViaje):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/reservarViaje' , reservarViaje);
  }

  public cancelarViaje(idViaje:number):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/cancelarViaje' , idViaje);
  }

}