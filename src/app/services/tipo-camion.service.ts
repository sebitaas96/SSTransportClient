import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoCamion } from '../models/tipo-camion';

@Injectable({
  providedIn: 'root'
})
export class TipoCamionService {

  private tipoCamionUrl = environment.tipoCamionUrl;

  constructor(
    private http:HttpClient
  ) { }

  public findAll():Observable<TipoCamion[]>{
    return this.http.get<TipoCamion[]>(this.tipoCamionUrl+'/findAll');
  }
}
