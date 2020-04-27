import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http: HttpClient) {}

  getAreas(): Observable<any>{
    return this.http.get("/api/area");
  }
}
