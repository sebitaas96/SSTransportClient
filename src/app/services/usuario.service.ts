import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conductor } from '../models/conductor';
import { Transporte } from '../models/transporte';
import { Usuario } from '../models/usuario';
import { PerfilComponent } from '../vistas/perfil/perfil.component';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private transporteUrl = environment.transporteUrl;
  private conductorUrl = environment.conductorUrl;

  constructor(private http:HttpClient) { 

  }

  public findEmpresaTransprte(nombreUsuario:string):Observable<Transporte>{
    return this.http.get<Transporte>(this.transporteUrl+'/'+nombreUsuario+'/Empresa');
  }

  public findEmpresaTransporte(idUsuario:number):Observable<Transporte>{
    return this.http.get<Transporte>(this.transporteUrl+'/'+idUsuario+'/EmpresaId');
  }

  public findAllConductores(idTransporte:number):Observable<Conductor[]>{
    return this.http.get<Conductor[]>(this.conductorUrl+'/'+idTransporte+'/findAll'); 
  }

}
