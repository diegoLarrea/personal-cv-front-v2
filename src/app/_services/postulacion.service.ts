import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

  constructor(private http: HttpClient) {}

  get(): Observable<any>{
    return this.http.get(`api/public/postulacion`);
  }

  post(body): Observable<any>{
    return this.http.post(`api/public/postulacion`, body);
  }

  put(body, id): Observable<any>{
    return this.http.put(`api/public/postulacion/${id}`, body);
  }

  delete(id): Observable<any>{
    return this.http.delete(`api/public/postulacion/${id}`);
  }

}