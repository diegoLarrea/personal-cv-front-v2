import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
import { NgxPermissionsService } from 'ngx-permissions';
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
    private auth: AuthenticationService,
    private permissionsService: NgxPermissionsService) {
    // this.layout = this.route.snapshot.firstChild.data.layout;

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        let idActive = this.route.snapshot.firstChild.data.id;
        let obj = this.sideOptionsPublic.find(it => {
          return it.id == idActive;
        });
        if(obj == null){
          obj = this.sideOptionsAdmin.find(it => {
            return it.id == idActive;
          });
        }
        if (this.current != null) {
          this.current.active = false;
        }
        obj.active = true;
        this.current = obj;
      }
    });
  }

  hasCollapse = false;
  user: User = new User();
  ngOnInit() {
    this.auth.permisos().subscribe(
      data => {
        let perms = [];
        for (let i = 0; i < data.length; i++) {
          perms.push(data[i].codename);
        }
        this.permissionsService.loadPermissions(perms);
      }
    )
    this.apiUser.getById(this.auth.getUser()).subscribe(
      data => {
        this.user = data;
      }
    )
  }

  sideFunction() { this.hasCollapse = !$("body").hasClass("sidebar-collapse"); }

  salir() {
    this.auth.logout();
  }

  sideOptionsPublic = [
    {
      permiso: "api_listar_empleos",
      id: 1,
      title: "Empleos disponibles",
      route: "/portal/empleos-disponibles",
      icon: "nav-icon fas fa-briefcase",
      active: false,
      isTitle: false
    },
    {
      permiso: "api_editar_persona",
      id: 2,
      title: "Cargar CV",
      route: "/portal/cargar-cv",
      icon: "nav-icon fas fa-pencil-alt",
      active: false,
      isTitle: false
    },
    {
      permiso: "api_listar_postulaciones",
      id: 3,
      title: "Postulaciones",
      route: "/portal/postulaciones",
      icon: "nav-icon fas fa-star",
      active: false,
      isTitle: false
    }
  ];

  sideOptionsAdmin = [
    {
      permiso: "a_cambiar",
      id: 4,
      title: "Currículums",
      route: "/portal/curriculums",
      icon: "nav-icon fas fa-paste",
      active: false,
      isTitle: false
    },
    {
      permiso: "a_cambiar",
      id: 5,
      title: "Empleos",
      route: "/portal/empleos",
      icon: "nav-icon fas fa-briefcase",
      active: false,
      isTitle: false
    },
    {
      permiso: "a_cambiar",
      id: 6,
      title: "Ajustes",
      route: "/portal/ajustes",
      icon: "nav-icon fas fa-cog",
      active: false,
      isTitle: false
    },
    {
      permiso: "a_cambiar",
      id: 7,
      title: "Usuarios",
      route: "/portal/usuarios",
      icon: "nav-icon fas fa-user-friends",
      active: false,
      isTitle: false
    }
  ]
}
