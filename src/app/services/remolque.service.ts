import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { asignacionEquipo } from '../dto/asignacionEquipo';
import { CambiarEstado } from '../dto/cambiarEstado';
import { Camion } from '../models/camion';
import { Remolque } from '../models/remolque';

@Injectable({
  providedIn: 'root'
})
export class RemolqueService {

  private remolqueUrl = environment.remolqueUrl;


  constructor(
    private http:HttpClient
  ) { }

  public addRemolque(remolque:Remolque):Observable<any>{
    return this.http.post<any>(this.remolqueUrl+'/nuevo',remolque)
  }

  public findAll(idEmpresa:number):Observable<Remolque[]>{
    return this.http.get<Remolque[]>(this.remolqueUrl+'/'+idEmpresa+'/findAll');
  }

  
  public findAllConductor(idConductor:number):Observable<Remolque[]>{
    return this.http.get<Remolque[]>(this.remolqueUrl+'/'+idConductor+'/findAllConductor');
  }

  public updateEstadoRemolque(cambioEstado:CambiarEstado):Observable<any>{
    return this.http.put<any>(this.remolqueUrl+'/cambiarEstado' , cambioEstado);
  }

  public updateConductorRemolqiue(asignacion:asignacionEquipo):Observable<any>{
    return this.http.put<any>(this.remolqueUrl+'/cambiarConductor',asignacion);
  }

  

  public deleteRemolque(idRemolque:number): Observable<any>{
    return this.http.delete<any>(this.remolqueUrl+'/'+idRemolque+'/deleteRemolque');
  }

}
