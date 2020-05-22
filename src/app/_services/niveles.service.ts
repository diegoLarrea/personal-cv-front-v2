import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private http: HttpClient) {}

  getNiveles(): Observable<any>{
    return this.http.get("/api/admin/nivel");
  }

  postNivel(body): Observable<any>{
    return this.http.post("/api/admin/nivel", body);
  }

  putNivel(id,body): Observable<any>{
    return this.http.put(`/api/admin/nivel/${id}`, body);
  }

  deleteNivel(id): Observable<any>{
    return this.http.delete(`/api/admin/nivel/${id}`);
  }
}