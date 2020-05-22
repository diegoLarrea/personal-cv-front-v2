import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private http: HttpClient) {}

  getLocalidades(): Observable<any>{
    return this.http.get("/api/admin/localidad");
  }

  postLocalidad(body): Observable<any>{
    return this.http.post("/api/admin/localidad", body);
  }

  putLocalidad(id,body): Observable<any>{
    return this.http.put(`/api/admin/localidad/${id}`, body);
  }

  deleteLocalidad(id): Observable<any>{
    return this.http.delete(`/api/admin/localidad/${id}`);
  }
}