import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  layout = true;
  current = null;
  constructor(private route: ActivatedRoute, private router: Router) {
    this.layout = this.route.snapshot.firstChild.data.layout;
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
  ngOnInit(): void {
    
  }

  sideFunction() { this.hasCollapse = !$("body").hasClass("sidebar-collapse"); }

  sideOptions = [
    {
      id: 1,
      title: "Empleos disponibles",
      route: "/empleos-disponibles",
      icon: "nav-icon fas fa-briefcase",
      active: false,
      isTitle: false
    },
    {
      id: 2,
      title: "Cargar CV",
      route: "/cargar-cv",
      icon: "nav-icon fas fa-pencil-alt",
      active: false,
      isTitle: false
    },
    {
      id: 3,
      title: "Postulaciones",
      route: "/postulaciones",
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
      route: "/curriculums",
      icon: "nav-icon fas fa-paste",
      active: false,
      isTitle: false
    },
    {
      id: 5,
      title: "Empleos",
      route: "/empleos",
      icon: "nav-icon fas fa-briefcase",
      active: false,
      isTitle: false
    },
    {
      id: 6,
      title: "Ajustes",
      route: "/ajustes",
      icon: "nav-icon fas fa-cog",
      active: false,
      isTitle: false
    },
    {
      id: 7,
      title: "Usuarios",
      route: "/usuarios",
      icon: "nav-icon fas fa-cog",
      active: false,
      isTitle: false
    }
  ]
}
