import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { asignacionEquipo } from '../dto/asignacionEquipo';
import { CambiarEstado } from '../dto/cambiarEstado';
import { Camion } from '../models/camion';

@Injectable({
  providedIn: 'root'
})
export class CamionService {

  private camionUrl = environment.camionUrl;

  constructor(
    private http:HttpClient
  ) { }

  public addCamion(camion:Camion):Observable<any>{
    return this.http.post<any>(this.camionUrl+'/nuevo',camion);
  }

  public findAll(idEmpresa:number):Observable<Camion[]>{
    return this.http.get<Camion[]>(this.camionUrl+'/'+idEmpresa+'/findAll')
  }

  public findAllConductor(idConductor:number):Observable<Camion[]>{
    return this.http.get<Camion[]>(this.camionUrl+'/'+idConductor+'/findAllConductor')
  }


  public updateEstadoCamion(cambioEstado:CambiarEstado):Observable<any>{
    return this.http.put<any>(this.camionUrl+'/cambiarEstado' , cambioEstado);
  }

  public updateConductorCamion(asignacion:asignacionEquipo):Observable<any>{
    return this.http.put<any>(this.camionUrl+'/cambiarConductor',asignacion);
  }

  
  public deleteCamion(idCamion:number): Observable<any>{
    return this.http.delete<any>(this.camionUrl+'/'+idCamion+'/deleteCamion');
  }
}
