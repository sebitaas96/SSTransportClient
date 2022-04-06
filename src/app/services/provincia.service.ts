import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localidad } from '../models/localidad';
import { Provincia } from '../models/provincia';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private provinciaUrl = environment.provinciaUrl;

  constructor(private http:HttpClient) {
  
   }
  
  public findAll():Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.provinciaUrl);
  }

  public findLocalidades(id:number):Observable<Localidad[]>{
    return this.http.get<Localidad[]>(this.provinciaUrl+'/'+id+'/localidades');
  }
}
