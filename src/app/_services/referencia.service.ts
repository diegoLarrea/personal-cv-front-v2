import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { FileModel } from '../_models/file';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {

  constructor(private http: HttpClient) {}

  get(): Observable<any>{
    return this.http.get(`api/public/referencia`);
  }

  post(body): Observable<any>{
    return this.http.post(`api/public/referencia`, body);
  }

  put(body, id): Observable<any>{
    return this.http.put(`api/public/referencia/${id}`, body);
  }

  delete(id): Observable<any>{
    return this.http.delete(`api/public/referencia/${id}`);
  }

}