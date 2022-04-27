import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addCuenta } from '../dto/addCuenta';
import { CambiarEstadoConductor } from '../dto/cambiarEstadoConductor';
import { CambioPassword } from '../dto/cambioPassword';
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
  private usuarioUrl = environment.usuarioUrl;

  constructor(private http:HttpClient) { 

  }

  //TRANSPORTE
  public findEmpresaTransprte(nombreUsuario:string):Observable<Transporte>{
    return this.http.get<Transporte>(this.transporteUrl+'/'+nombreUsuario+'/Empresa');
  }

  public findEmpresaTransporte(idUsuario:number):Observable<Transporte>{
    return this.http.get<Transporte>(this.transporteUrl+'/'+idUsuario+'/EmpresaId');
  }

  public updateTransporte(transporte:Transporte):Observable<any>{
    return this.http.put<any>(this.transporteUrl+'/updateTransporte', transporte);
  }

  ///CONDUCTORES
  public findConductorNombre(nombreUsuario:string):Observable<Conductor>{
    return this.http.get<Conductor>(this.conductorUrl+'/'+nombreUsuario+'/ConductorNombre');
  }

  public findAllConductores(idTransporte:number):Observable<Conductor[]>{
    return this.http.get<Conductor[]>(this.conductorUrl+'/'+idTransporte+'/findAll'); 
  }

  public deleteConductor(idConductor:number): Observable<any>{
    return this.http.delete<any>(this.conductorUrl+'/'+idConductor+'/deleteConductor');
  }

  public updateEstadoConductor(cambioEstado:CambiarEstadoConductor):Observable<any>{
    return this.http.put<any>(this.conductorUrl+'/cambiarEstado' , cambioEstado);
  }

  public updateConductor(conductor:Conductor):Observable<any>{
    return this.http.put<any>(this.conductorUrl+'/updateConductor', conductor);
  }


  //ALL
  public updatePassword(cambioPwd:CambioPassword):Observable<any>{
    return this.http.put<any>(this.usuarioUrl+'/updatePassword', cambioPwd);
  }

  

  public findUsuario(nombreUsuario:string):Observable<Usuario>{
    return this.http.get<Usuario>(this.usuarioUrl+'/'+nombreUsuario+'/Usuario');
  }

  public addCuenta(dtoAddCuenta:addCuenta):Observable<any>{
     return this.http.put<any>(this.usuarioUrl+'/addCuenta',dtoAddCuenta); 
  }

}
