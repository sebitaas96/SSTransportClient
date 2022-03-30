import { Injectable } from '@angular/core';
import { Transporte } from '../models/transporte';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

  private transporteUrl:string;

  constructor(private http:HttpClient) {
    this.transporteUrl = 'http://localhost:8080/transporte';
  }

  public save(transporte:Transporte){
    console.log(transporte);
    console.log(this.transporteUrl)
    return this.http.post<Transporte>(this.transporteUrl, transporte);
  } 
}
