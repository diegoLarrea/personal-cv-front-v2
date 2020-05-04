import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private http: HttpClient) {}

  getLocalidades(): Observable<any>{
    return this.http.get("/api/localidad");
  }
}