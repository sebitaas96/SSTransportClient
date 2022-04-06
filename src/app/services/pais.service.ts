import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais';
import { Provincia } from '../models/provincia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private paisUrl = environment.paisUrl;

  constructor(private http:HttpClient) {
   }
  
  public findAll():Observable<Pais[]>{
    return this.http.get<Pais[]>(this.paisUrl);
  }

  public findProvincias(id:number):Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.paisUrl+'/'+id+'/provincias');
  }

}
