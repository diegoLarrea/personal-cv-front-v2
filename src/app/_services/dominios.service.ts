import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DominioService {

  constructor(private http: HttpClient) {}

  getDominios(): Observable<any>{
    return this.http.get("/api/admin/dominio");
  }

  postDominio(body): Observable<any>{
    return this.http.post("/api/admin/dominio", body);
  }

  putDominio(id,body): Observable<any>{
    return this.http.put(`/api/admin/dominio/${id}`, body);
  }

  deleteDominio(id): Observable<any>{
    return this.http.delete(`/api/admin/dominio/${id}`);
  }
}