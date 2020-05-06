import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  SITE_KEY = "6LdOFPMUAAAAAM7H527IQBmGar4vx1ccW3YZCUcz";
  repeatPass = null;
  user = {
    nombres: null,
    apellidos: null,
    documento: null,
    email: null,
    password: null
  };

  myGroup = new FormGroup({
    recaptchaReactive: new FormControl()
  });

  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  captcha = false;
  postUser(){
    let result = this.validateUser();
    if(result.res){
      this.auth.registrarse(this.user).subscribe(
        data => {
          this.toastr.info("Usuario creado");
          this.router.navigate(["login"]);
        },
        error => {
          if(error.hasOwnProperty("error")){
            if(error.error.hasOwnProperty("mensaje")){
              this.toastr.error(error.error.mensaje);
            }else {
              this.toastr.error("Error al crear cuenta")
            }
          }else {
            this.toastr.error("Error al crear cuenta")
          }
        }
      )
    }else {
      this.toastr.error(result.msj);
    }
  }

  validateUser() {
    if(!(this.user.nombres != null &&
    this.user.apellidos != null &&
    this.user.documento != null &&
    this.user.email != null &&
    this.user.password != null &&
    this.repeatPass != null))
      return {res: false, msj: "Complete los campos"};
    
    if(this.user.password != this.repeatPass){
      return {res: false, msj: "Las contraseñas no coinciden"};
    }

    if(!this.captcha){
      return {res: false, msj: "Verifique captcha"};
    }

    return {res:true}
  }

  resolved(captchaResponse: string) {
    this.auth.captcha({captcha:captchaResponse}).subscribe(
      data => {
        if(!data.success){
          grecaptcha.reset();
          this.toastr.error("Error al resolver captcha"); 
        }
        this.captcha = data.success;
      }
    )
    
  }
}
