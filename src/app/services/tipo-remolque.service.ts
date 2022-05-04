import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoRemolque } from '../models/tipo-remolque';

@Injectable({
  providedIn: 'root'
})
export class TipoRemolqueService {

  private tipoRemolqueUrl = environment.tipoRemolqueUrl;

  constructor(
    private http:HttpClient
  ) { }

  public findAll():Observable<TipoRemolque[]>{
    return this.http.get<TipoRemolque[]>(this.tipoRemolqueUrl+'/findAll');
  }
}
