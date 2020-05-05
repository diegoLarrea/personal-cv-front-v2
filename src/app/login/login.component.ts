import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private token: TokenStorageService, private router: Router) { }

  helper = new JwtHelperService();

  user: string = "";
  pass: string = "";
  
  ngOnInit(): void {
  }

  login(){
    this.auth.login(this.user, this.pass).subscribe(
      data => {
        this.token.saveToken(JSON.stringify(data));    
        this.router.navigate(['portal']);
      },
      error => {
        console.log(error);
      }
    )
  }
}
