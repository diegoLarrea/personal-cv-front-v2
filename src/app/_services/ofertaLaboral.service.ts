import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OfertaLaboralService {

    constructor(private http: HttpClient) { }

    getOfertasLaborales(page, buscar, cantidad, areas, localidades): Observable<any> {

        let params = new HttpParams();
        params = params.append("page", page.toString());

        if (cantidad != null) {
            params = params.append("cantidad", cantidad.toString());
        }

        if (buscar != null) {
            params = params.append("oportunidad", buscar.toString());
        }

        let filter = {}

        if (areas.length > 0) {
            let a = [];
            for (let i = 0; i < areas.length; i++) {
                a.push({ id: areas[i].id });
            }
            filter["areas"] = a;
        }

        if (localidades.length > 0) {
            let l = [];
            for (let i = 0; i < localidades.length; i++) {
                l.push({ id: localidades[i].id });
            }
            filter["localidades"] = l;
        }

        params = params.append("filters", JSON.stringify(filter));

        return this.http.get("/api/empleo", { params: params });
    }
}