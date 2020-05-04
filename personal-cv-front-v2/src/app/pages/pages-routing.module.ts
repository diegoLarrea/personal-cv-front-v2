import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { EmpleosComponent } from './empleos/empleos.component';
import { HomeComponent } from './home/home.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { CurriculumsComponent } from './curriculums/curriculums.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpleosDisponiblesComponent } from './empleos-disponibles/empleos-disponibles.component';
import { AuthGuardService } from '../_services/guard';


const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
      }, 
      {
        path: "home",
        component: HomeComponent,
        data: {
          layout: false
        }
      },
      {
        path: "empleos-disponibles",
        component: EmpleosDisponiblesComponent,
        data: {
          layout: true,
          id: 1
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "cargar-cv",
        component: CargarCvComponent,
        data: {
          layout: true,
          id: 2
        }
      },
      {
        path: "postulaciones",
        component: PostulacionesComponent,
        data: {
          layout: true,
          id: 3
        }
      },
      {
        path: "curriculums",
        component: CurriculumsComponent,
        data: {
          layout: true,
          id: 4
        }
      },
      {
        path: "empleos",
        component: EmpleosComponent,
        data: {
          layout: true,
          id: 5
        }
      },
      {
        path: "ajustes",
        component: AjustesComponent,
        data: {
          layout: true,
          id: 6
        }
      },
      {
        path: "usuarios",
        component: UsuariosComponent,
        data: {
          layout: true,
          id: 7
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
