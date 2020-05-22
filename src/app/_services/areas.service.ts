import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) {}

  getAreas(): Observable<any>{
    return this.http.get("/api/admin/area");
  }

  postArea(body): Observable<any>{
    return this.http.post("/api/admin/area", body);
  }

  putArea(id,body): Observable<any>{
    return this.http.put(`/api/admin/area/${id}`, body);
  }

  deleteArea(id): Observable<any>{
    return this.http.delete(`/api/admin/area/${id}`);
  }
}