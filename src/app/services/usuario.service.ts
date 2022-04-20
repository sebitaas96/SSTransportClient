import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarioUrl = environment.usuarioUrl
  private transporteUrl = environment.transporteUrl;

  constructor(private http:HttpClient) { }

  public findEmpresaTransprte(nombreUsuario:string){
    return this.http.get(this.transporteUrl+'/'+nombreUsuario+'/Empresa', { responseType: 'text' });
  }
}
