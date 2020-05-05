import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  repeatPass = null;
  user = {
    nombres: null,
    apellidos: null,
    documento: null,
    email: null,
    password: null
  }
  constructor(private apiUser: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
  }

  postUser(){
    if(this.validateUser()){
      if(this.user.password == this.repeatPass){
        this.apiUser.post(this.user).subscribe(
          data => {
            this.router.navigate(["login"]);
          },
          error => {
            if(error.hasOwnProperty("error")){
              this.toastr.error(error.error.mensaje);
            }else {
              this.toastr.error("Error al crear cuenta")
            }
          }
        )
      }else{
        this.toastr.error("Las contraseñas no coinciden");
      }
    }else {
      this.toastr.error("Complete los campos");
    }
  }

  validateUser(): boolean {
    return this.user.nombres != null &&
    this.user.apellidos != null &&
    this.user.documento != null &&
    this.user.email != null &&
    this.user.password != null &&
    this.repeatPass != null
  }
}
