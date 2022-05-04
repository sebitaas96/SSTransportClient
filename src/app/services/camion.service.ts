import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
