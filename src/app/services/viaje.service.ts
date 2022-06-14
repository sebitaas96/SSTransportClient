import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AsignarCamion } from '../dto/asignarCamion';
import { AsignarConductor } from '../dto/asignarConductor';
import { AsignarRemolque } from '../dto/asignarRemolque';
import { ReactivarViaje } from '../dto/reactivarViaje';
import { ReservarViaje } from '../dto/reservarViaje';
import { UpdateFecha } from '../dto/udpateFecha';
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
  public findAllTransporte(idEmpresa:number):Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.viajeUrl+'/'+idEmpresa+'/findAllTransporte');
  }

  public findAllPanel():Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.viajeUrl+"/findAllPanel");
  }

  public findAllExpedidor(idExpedidor:number):Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.viajeUrl+'/'+idExpedidor+'/findAllExpedidor');
  }

  public findAllConductor(idConductor:number):Observable<Viaje[]>{
    return this.http.get<Viaje[]>(this.viajeUrl+'/'+idConductor+'/findAllConductor');
  }

  public findViajeId(idViaje:number):Observable<Viaje>{
    return this.http.get<Viaje>(this.viajeUrl+'/'+idViaje+'/findViajeId');
  }

  public findViajeIdPago(idPago:number):Observable<Viaje>{
    return this.http.get<Viaje>(this.viajeUrl+'/'+idPago+'/findViajeIdPago');
  }


  public reservarViaje(reservarViaje:ReservarViaje):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/reservarViaje' , reservarViaje);
  }

  public cancelarViaje(idViaje:number):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/cancelarViaje' , idViaje);
  }

  public reactivarViaje(reactivarViaje:ReactivarViaje):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/reactivarViaje' , reactivarViaje);
  }

  public eliminarViaje(idViaje:number):Observable<any>{
    return this.http.delete<any>(this.viajeUrl+'/'+idViaje+'/deleteViaje');
  }

  public asignarConductor(asignarConductor:AsignarConductor):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/asignarConductor' , asignarConductor);
  }

  public updateConductor(idViaje:number):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/updateConductor' , idViaje);
  }


  public asignarCamion(asignarCamion:AsignarCamion):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/asignarCamion' , asignarCamion);
  }

  public asignarRemolque(asignarRemolque:AsignarRemolque):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/asignarRemolque' , asignarRemolque);
  }

  public updateFechaInicio(updateFecha:UpdateFecha):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/updateFechaInicio' , updateFecha);
  }

  public updateFechaFin(updateFecha:UpdateFecha):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/updateFechaFin' , updateFecha);
  }

  public IniciarViaje(idViaje:number):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/iniciarViaje' , idViaje);
  }

  public FinalizarViaje(idViaje:number):Observable<any>{
    return this.http.put<any>(this.viajeUrl+'/finalizarViaje' , idViaje);
  }

  


  


}