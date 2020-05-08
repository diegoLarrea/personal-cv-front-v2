import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { FileModel } from '../_models/file';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  constructor(private http: HttpClient) {}

  get(): Observable<any>{
    return this.http.get(`api/public/educacion`);
  }

  post(body): Observable<any>{
    return this.http.post(`api/public/educacion`, body);
  }

  put(body, id): Observable<any>{
    let file: FileModel = new FileModel();
    file.filename = body.documento.filename;
    file.file = body.documento.file;
    body.documento = JSON.stringify(file);
    return this.http.put(`api/public/educacion/${id}`, body);
  }

  delete(id): Observable<any>{
    return this.http.delete(`api/public/educacion/${id}`);
  }

  getIdioma(): Observable<any>{
    return this.http.get(`api/public/idioma`);
  }

  postIdioma(body): Observable<any>{
    return this.http.post(`api/public/idioma`, body);
  }

  putIdioma(body, id): Observable<any>{
    return this.http.put(`api/public/idioma/${id}`, body);
  }

  deleteIdioma(id): Observable<any>{
    return this.http.delete(`api/public/idioma/${id}`);
  }
}