import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    
    constructor(
        public jwtHelper: JwtHelperService, 
        private http: HttpClient,
        private router: Router 
    ) {}
    
    helper = new JwtHelperService();

    public login(username, password): Observable<any> {
        return this.http.post(`api/login`, {
            username: username,
            password: password
        });
    }

    public registrarse(body): Observable<any> {
        return this.http.post(`api/registrarse`, body);
    }

    public captcha(body): Observable<any> {
        return this.http.post(`api/captcha`, body)
    }

    public permisos(): Observable<any>{
        return this.http.get(`api/permisos`);
    }

    public logout(){
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        this.router.navigate([""]);
    }

    public saveToken(token:string){
        localStorage.removeItem(TOKEN_KEY);
        localStorage.setItem(TOKEN_KEY, token);

        this.saveUser(this.helper.decodeToken(token).user_id);
    }

    private saveUser(user_id){
        localStorage.setItem(USER_KEY, user_id)
    }

    public getToken():string {
        return localStorage.getItem(TOKEN_KEY);
    }

    public getUser(){
        return localStorage.getItem(USER_KEY);
    }    

    public isAuthenticated(): boolean {
        if(this.getToken() == null) return false;
        return !this.helper.isTokenExpired(this.getToken());
    }
}