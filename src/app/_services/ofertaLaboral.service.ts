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
                a.push({ id: areas[i] });
            }
            filter["areas"] = a;
        }

        if (localidades.length > 0) {
            let l = [];
            for (let i = 0; i < localidades.length; i++) {
                l.push({ id: localidades[i] });
            }
            filter["localidades"] = l;
        }

        params = params.append("filters", JSON.stringify(filter));

        return this.http.get("/api/public/empleos", { params: params });
    }

    obtenerFiltros(): Observable<any> {
        return this.http.get(`api/public/empleos/obtener-filtros`);
    }

    getEmpleoById(id): Observable<any> {
        return this.http.get(`api/public/empleos/${id}`);
    }

    getEmpleos(params): Observable<any> {
        let httpParams = new HttpParams();
        httpParams = httpParams.append("page", params.page.toString());
        httpParams = httpParams.append("cantidad", params.can.toString());
        httpParams = httpParams.append("orderBy", params.by.toString());
        httpParams = httpParams.append("orderDir", params.dir.toString());
        httpParams = httpParams.append("filters", JSON.stringify(params.filters));

        return this.http.get(`api/admin/empleo`, {params: httpParams});
    }

    postEmpleo(body): Observable<any> {
        return this.http.post(`api/admin/empleo`, body);
    }

    getById(id): Observable<any> {
        return this.http.get(`api/admin/empleo/${id}`);
    }

    putEmpleo(body, id): Observable<any> {
        return this.http.put(`api/admin/empleo/${id}`, body);
    }
}