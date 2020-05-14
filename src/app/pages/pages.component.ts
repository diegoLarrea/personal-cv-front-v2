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
        if (obj == null) {
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
  screenWidth = null;
  ngOnInit() {
    this.auth.obtenerUsuarioLogueado().subscribe(
      data => {
        this.user = data.usuario;
        let perms = [];
        for (let i = 0; i < data.permisos.length; i++) {
          perms.push(data.permisos[i].codename);
        }
        this.permissionsService.loadPermissions(perms);
      }
    )

    this.screenWidth = window.innerWidth || document.documentElement.clientWidth ||
      document.body.clientWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth || document.documentElement.clientWidth ||
        document.body.clientWidth;
    }

    // document.getElementById("sidebar-wrapper").addEventListener("click", (e) => {
    //   var rect = e.target.getBoundingClientRect();
    //   var minX = rect.left + e.target.clientLeft;
    //   var minY = rect.top + e.target.clientTop;
    //   if ((e.clientX < minX || e.clientX >= minX + e.target.clientWidth) ||
    //     (e.clientY < minY || e.clientY >= minY + e.target.clientHeight)) {
    //     e.target.close();
    //   }
    // });
  }

  salir() {
    this.auth.logout();
  }

  sideOptionsPublic = [
    {
      id: 1,
      title: "Empleos disponibles",
      route: "/portal/empleos-disponibles",
      icon: "nav-icon fas fa-briefcase mr-2",
      active: false,
      hover: false
    },
    {
      id: 2,
      title: "Cargar CV",
      route: "/portal/cargar-cv",
      icon: "nav-icon fas fa-pencil-alt mr-2",
      active: false,
      hover: false
    },
    {
      id: 3,
      title: "Postulaciones",
      route: "/portal/postulaciones",
      icon: "nav-icon fas fa-star mr-2",
      active: false,
      hover: false
    }
  ];

  sideOptionsAdmin = [
    {
      permiso: "a_cambiar",
      id: 7,
      title: "Usuarios",
      route: "/portal/usuarios",
      icon: "nav-icon fas fa-user-friends mr-2",
      active: false,
      hover: false
    },
    {
      permiso: "a_cambiar",
      id: 5,
      title: "Empleos",
      route: "/portal/empleos",
      icon: "nav-icon fas fa-briefcase mr-2",
      active: false,
      hover: false
    },
    {
      permiso: "a_cambiar",
      id: 6,
      title: "Ajustes",
      route: "/portal/ajustes",
      icon: "nav-icon fas fa-cog mr-2",
      active: false,
      hover: false
    }
  ]

  toggleSideBar(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    if(this.screenWidth < 768){
      if(this.hasToggled()){
        $(".overlay").addClass("active");
      }else{
        $(".overlay").removeClass("active");        
      }
    }
  }

  hasToggled(): boolean {
    return $("#wrapper").hasClass("toggled");
  }

  toggleOnClick(e) {
    if (this.screenWidth < 768) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
      $(".overlay").removeClass("active");
    }
  }
}
