
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Gravedad } from '../models/gravedad';

@Injectable({
    providedIn: 'root'
  })
  export class GravedadService {

    private gravedadUrl = environment.gravedadUrl;


    constructor(private httpClient: HttpClient) { }

    public findAll():Observable<Gravedad[]>{
        return this.httpClient.get<Gravedad[]>(this.gravedadUrl+'/findAll');
      }
  }