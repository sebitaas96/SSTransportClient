import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class GooglemapsService {
  constructor(private httpClient: HttpClient) { }

 /* public getDistancia(origen: string, destino: string):any {
    return new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': [origen], 'destinations': [destino], travelMode:google.maps.TravelMode.DRIVING}, (results: any)=>data);
  }*/

getDistancia(origen :string , destino:string){
    return new Promise((resolve , reject)=> {
      let response ;
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins:[origen],
        destinations:[destino],
        travelMode:google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      },
      function(resp ,status){
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          response = reject(status);
      } else {
          response = resolve(resp);
      }
      }
      );
      return response;
    })
  }

}