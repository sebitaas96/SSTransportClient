import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { addCuenta } from '../dto/addCuenta';
import { CambiarEstado} from '../dto/cambiarEstado';
import { CambioPassword } from '../dto/cambioPassword';
import { Conductor } from '../models/conductor';
import { Expedidor } from '../models/expedidor';
import { Porte } from '../models/porte';
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
  private porteUrl = environment.porteUrl;
  private expedidorUrl = environment.expediorUrl;

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

  //PORTE

  public findEmpresaPorteNombre(nombreUsuario:string):Observable<Porte>{
    return this.http.get<Porte>(this.porteUrl+'/'+nombreUsuario+'/Empresa');
  }

  public updatePorte(porte:Porte):Observable<any>{
    return this.http.put<any>(this.porteUrl+'/updatePorte', porte);
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

  public updateEstadoConductor(cambioEstado:CambiarEstado):Observable<any>{
    return this.http.put<any>(this.conductorUrl+'/cambiarEstado' , cambioEstado);
  }

  public updateConductor(conductor:Conductor):Observable<any>{
    return this.http.put<any>(this.conductorUrl+'/updateConductor', conductor);
  }

  //EXPEDIDORES

  public findExpedidorNombre(nombreUsuario:string):Observable<Expedidor>{
    return this.http.get<Expedidor>(this.expedidorUrl+'/'+nombreUsuario+'/ExpedidorNombre');
  }

  public findAllExpedidores(idPorte:number):Observable<Expedidor[]>{
    return this.http.get<Expedidor[]>(this.expedidorUrl+'/'+idPorte+'/findAll'); 
  }

  public deleteExpedidor(idExpedidor:number): Observable<any>{
    return this.http.delete<any>(this.expedidorUrl+'/'+idExpedidor+'/deleteExpedidor');
  }

  public updateEstadoExpedidor(cambioEstado:CambiarEstado):Observable<any>{
    return this.http.put<any>(this.expedidorUrl+'/cambiarEstado' , cambioEstado);
  }

  public updateExpedidor(expedidor:Expedidor):Observable<any>{
    return this.http.put<any>(this.expedidorUrl+'/updateExpedidor', expedidor);
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
