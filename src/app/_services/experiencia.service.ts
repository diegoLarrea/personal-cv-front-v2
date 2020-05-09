import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { FileModel } from '../_models/file';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  constructor(private http: HttpClient) {}

  get(): Observable<any>{
    return this.http.get(`api/public/experiencia`);
  }

  post(body): Observable<any>{
    return this.http.post(`api/public/experiencia`, body);
  }

  put(body, id): Observable<any>{
    let file: FileModel = new FileModel();
    file.filename = body.documento.filename;
    file.file = body.documento.file;
    body.documento = JSON.stringify(file);
    return this.http.put(`api/public/experiencia/${id}`, body);
  }

  delete(id): Observable<any>{
    return this.http.delete(`api/public/experiencia/${id}`);
  }

}