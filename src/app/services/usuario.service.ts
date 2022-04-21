import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Transporte } from '../models/transporte';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioUrl = environment.usuarioUrl
  private transporteUrl = environment.transporteUrl;

  constructor(private http:HttpClient) { }

  public findEmpresaTransprte(nombreUsuario:string):Observable<Transporte>{
    return this.http.get<Transporte>(this.transporteUrl+'/'+nombreUsuario+'/Empresa');
  }

  public findEmpresaTransporte(idUsuario:number):Observable<Transporte>{
    return this.http.get<Transporte>(this.transporteUrl+'/'+idUsuario+'/EmpresaId');
  }
}
