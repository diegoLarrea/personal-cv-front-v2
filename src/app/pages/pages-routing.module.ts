import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { CurriculumsComponent } from './curriculums/curriculums.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpleosDisponiblesComponent } from './empleos-disponibles/empleos-disponibles.component';
import { AuthGuardService } from '../_services/guard';


const routes: Routes = [
  {
    path: "portal",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "empleos-disponibles",
        pathMatch: "full"
      },
      {
        path: "empleos-disponibles",
        component: EmpleosDisponiblesComponent,
        data: {
          id: 1
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "cargar-cv",
        component: CargarCvComponent,
        data: {
          id: 2
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "postulaciones",
        component: PostulacionesComponent,
        data: {
          id: 3
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "curriculums",
        component: CurriculumsComponent,
        data: {
          id: 4
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "empleos",
        loadChildren: () => import('./empleos/empleos.module').then(m => m.EmpleosModule),
        data: {
          id: 5
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "ajustes",
        component: AjustesComponent,
        data: {
          id: 6
        },
        canActivate: [AuthGuardService]
      },
      {
        path: "usuarios",
        component: UsuariosComponent,
        data: {
          id: 7
        },
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
