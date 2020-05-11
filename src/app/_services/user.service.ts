import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  get(params): Observable<any>{
    let httpParams = new HttpParams();
    httpParams = httpParams.append("page", params.page.toString());
    httpParams = httpParams.append("cantidad", params.can.toString());
    httpParams = httpParams.append("orderBy", params.by.toString());
    httpParams = httpParams.append("orderDir", params.dir.toString());
    if(params.filters != null){
      httpParams = httpParams.append("search", params.filters);
    }
    return this.http.get(`api/admin/usuarios`, {params:httpParams});
  }

  getById(id): Observable<any>{
    return this.http.get(`api/admin/usuarios/${id}`);
  }

  post(body): Observable<any>{
    return this.http.post(`api/admin/usuarios`, body);
  }
}