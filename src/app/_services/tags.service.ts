import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {}

  getTags(): Observable<any>{
    return this.http.get("/api/admin/tag");
  }

  postTag(body): Observable<any>{
    return this.http.post("/api/admin/tag", body);
  }

  putTag(id,body): Observable<any>{
    return this.http.put(`/api/admin/tag/${id}`, body);
  }

  deleteTag(id): Observable<any>{
    return this.http.delete(`/api/admin/tag/${id}`);
  }
}