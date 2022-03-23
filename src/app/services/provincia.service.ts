import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Localidad } from '../models/localidad';
import { Provincia } from '../models/provincia';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private provinciaUrl:string;

  constructor(private http:HttpClient) {
    this.provinciaUrl = 'http://localhost:8080/provincia'
   }
  
  public findAll():Observable<Provincia[]>{
    return this.http.get<Provincia[]>(this.provinciaUrl);
  }

  public findLocalidades(id:number):Observable<Localidad[]>{
    return this.http.get<Localidad[]>(this.provinciaUrl+'/'+id+'/localidades');
  }
}
