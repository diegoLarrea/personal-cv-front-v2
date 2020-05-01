import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesModule } from 'angular-particle';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { EmpleosComponent } from './empleos/empleos.component';
import { HomeComponent } from './home/home.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { CurriculumsComponent } from './curriculums/curriculums.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpleosDisponiblesComponent } from './empleos-disponibles/empleos-disponibles.component';


@NgModule({
  declarations: [PagesComponent,
     EmpleosComponent,
     HomeComponent,
     CargarCvComponent,
     PostulacionesComponent,
     CurriculumsComponent,
     AjustesComponent, 
     UsuariosComponent, 
     EmpleosDisponiblesComponent],
  imports: [
    CommonModule,
    ParticlesModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
