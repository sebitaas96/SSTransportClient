import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais';
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private paisUrl:string;

  constructor(private http:HttpClient) {
    this.paisUrl = 'http://localhost:8080/pais'
   }
  
  public findAll():Observable<Pais[]>{
    return this.http.get<Pais[]>(this.paisUrl);
  }

  public findProvincias(id:number):Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.paisUrl+'/'+id+'/provincias');
  }

}
