import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {
  constructor(private httpClient: HttpClient) { }

  public getDistancia(origen: string, destino: string):any {
    return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino], travelMode:google.maps.TravelMode.DRIVING}, (results: any)=>data);
  }

}