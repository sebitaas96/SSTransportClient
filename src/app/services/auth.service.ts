import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario';
import { LoginUsuario } from '../models/login-usuario';
import { JwtDto } from '../models/jwt-dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private authURL = environment.authURL;

  constructor(private httpClient: HttpClient) { }

  public nuevo(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', usuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'login', loginUsuario);
  }

  public refresh(dto: JwtDto): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + 'refresh', dto);
  }
}
