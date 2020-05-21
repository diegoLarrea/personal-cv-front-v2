import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) {}

  getByUserId(id): Observable<any>{
    return this.http.get(`api/public/persona/${id}`);
  }

  putByUserId(id, body): Observable<any>{
    return this.http.put(`api/public/persona/${id}`, body);
  }

  getAllData(): Observable<any>{
    return this.http.get(`api/public/persona/all`);
  }
}