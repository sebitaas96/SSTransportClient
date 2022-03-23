import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';

@Injectable()
export class RolService {

  private rolesUrl: string;

  constructor(private http: HttpClient) { 
    this.rolesUrl = 'http://localhost:8080/roles';
  }

  public findAll(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.rolesUrl);
  }

  public save(rol: Rol) {
    return this.http.post<Rol>(this.rolesUrl, rol);
  }
}
