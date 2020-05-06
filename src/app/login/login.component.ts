import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticationService } from '../_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthenticationService, 
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  helper = new JwtHelperService();

  user: string = null;
  pass: string = null;
  
  ngOnInit(): void {
  }

  login(){
    if(this.user != null && this.pass != null){
      this.auth.login(this.user, this.pass).subscribe(
        data => {
          this.auth.saveToken(data.access);
          this.router.navigate(['portal']);
        },
        error => {
          this.toastr.error("Usuario y/o contraseña inválida");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }    
    
  }
}
