import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { TokenStorageService } from '../_services/token.service';
declare var $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  layout = true;
  current = null;
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private apiUser: UserService,
    private apiAuth: AuthService,
    private tokenService: TokenStorageService) {
    // this.layout = this.route.snapshot.firstChild.data.layout;
    
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let idActive = this.route.snapshot.firstChild.data.id;
        let obj = this.sideOptions.find(it =>{
          return it.id == idActive;
        });
        if(this.current != null){
          this.current.active = false;
        }
        obj.active = true;
        this.current = obj;
      }
    });
  }

  hasCollapse = false;
  user: User = new User();
  ngOnInit(): void {
    this.apiUser.getById(this.apiAuth.getUserId()).subscribe(
      data => {
        this.user = data;
      }
    )
  }

  sideFunction() { this.hasCollapse = !$("body").hasClass("sidebar-collapse"); }

  salir(){
    this.tokenService.signOut();
    this.router.navigate([""]);
  }

  sideOptions = [
    {
      id: null,
      title: "MENÚ",
      isTitle: true
    },
    {
      id: 1,
      title: "Empleos disponibles",
      route: "/portal/empleos-disponibles",
      icon: "nav-icon fas fa-briefcase",
      active: false,
      isTitle: false
    },
    {
      id: 2,
      title: "Cargar CV",
      route: "/portal/cargar-cv",
      icon: "nav-icon fas fa-pencil-alt",
      active: false,
      isTitle: false
    },
    {
      id: 3,
      title: "Postulaciones",
      route: "/portal/postulaciones",
      icon: "nav-icon fas fa-star",
      active: false,
      isTitle: false
    },
    {
      id: null,
      title: "ADMINISTRACIÓN",
      isTitle: true
    },
    {
      id: 4,
      title: "Currículums",
      route: "/portal/curriculums",
      icon: "nav-icon fas fa-paste",
      active: false,
      isTitle: false
    },
    {
      id: 5,
      title: "Empleos",
      route: "/portal/empleos",
      icon: "nav-icon fas fa-briefcase",
      active: false,
      isTitle: false
    },
    {
      id: 6,
      title: "Ajustes",
      route: "/portal/ajustes",
      icon: "nav-icon fas fa-cog",
      active: false,
      isTitle: false
    },
    {
      id: 7,
      title: "Usuarios",
      route: "/portal/usuarios",
      icon: "nav-icon fas fa-user-friends",
      active: false,
      isTitle: false
    }
  ]
}
