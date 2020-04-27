import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfertaLaboralService {

  constructor(private http: HttpClient) {}

  getOfertasLaborales(): Observable<any>{
    return this.http.get("/api/oferta");
  }
}
