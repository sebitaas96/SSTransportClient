import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Remolque } from '../models/remolque';

@Injectable()
export class RemolqueService {

  private remolquesUrl: string;

  constructor(private http: HttpClient) {
    this.remolquesUrl = 'http://localhost:8080/remolques';
   }

   public findAll(): Observable<Remolque[]> {
    return this.http.get<Remolque[]>(this.remolquesUrl);
  }

  public save(remolque: Remolque) {
    return this.http.post<Remolque>(this.remolquesUrl, remolque);
  }
}
