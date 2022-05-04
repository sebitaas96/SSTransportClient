import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
}
