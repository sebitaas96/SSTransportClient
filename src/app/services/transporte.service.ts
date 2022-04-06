import { Injectable } from '@angular/core';
import { Transporte } from '../models/transporte';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  private transporteUrl = environment.transporteUrl;

  constructor(private http:HttpClient) {

  }

  public save(transporte:Transporte){
    console.log(transporte);
    console.log(this.transporteUrl)
    return this.http.post<Transporte>(this.transporteUrl, transporte);
  } 
}
