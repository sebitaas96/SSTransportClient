import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private estadoUrl = environment.estadoUrl;

  constructor(
    private http:HttpClient
  ) { }

  public findAll():Observable<Estado[]>{
    return this.http.get<Estado[]>(this.estadoUrl+'/findAll');
  }
}
