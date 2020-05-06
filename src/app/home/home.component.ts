import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) {
    if(this.auth.isAuthenticated()){
      this.router.navigate(['portal']);
    }
  }

  ngOnInit(): void {}
}
