import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private rolUrl:string;

  constructor(private http:HttpClient) {
    this.rolUrl = 'http://localhost:8080/rol'
   }
  
  public findAll():Observable<Rol[]>{
    return this.http.get<Rol[]>(this.rolUrl);
  }
  
}
