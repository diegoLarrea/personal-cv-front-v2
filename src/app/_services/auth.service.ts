import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    helper = new JwtHelperService();
    constructor(public jwtHelper: JwtHelperService, private http: HttpClient, private token: TokenStorageService) { }
    // ...
    public isAuthenticated(): boolean {

        let t = JSON.parse(this.token.getToken());
        
        // Check whether the token is expired and return
        // true or false
        return !this.helper.isTokenExpired(t["access"]);
    }

    login(username, password): Observable<any> {
        return this.http.post(`api/token/`, {
            username: username,
            password: password
        });
    }

}