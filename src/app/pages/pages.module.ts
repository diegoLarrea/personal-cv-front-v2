import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesModule } from 'angular-particle';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CargarCvComponent } from './cargar-cv/cargar-cv.component';
import { PostulacionesComponent } from './postulaciones/postulaciones.component';
import { CurriculumsComponent } from './curriculums/curriculums.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { EmpleosDisponiblesComponent } from './empleos-disponibles/empleos-disponibles.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { DatosPersonalesComponent } from './cargar-cv/datos-personales/datos-personales.component';
import { DatosEducacionComponent } from './cargar-cv/datos-educacion/datos-educacion.component';
import { DatosExperienciasComponent } from './cargar-cv/datos-experiencias/datos-experiencias.component';
import { DatosReferenciasComponent } from './cargar-cv/datos-referencias/datos-referencias.component';


@NgModule({
  declarations: [
    PagesComponent,
    CargarCvComponent,
    PostulacionesComponent,
    CurriculumsComponent,
    AjustesComponent,
    UsuariosComponent,
    EmpleosDisponiblesComponent,
    DatosPersonalesComponent,
    DatosEducacionComponent,
    DatosExperienciasComponent,
    DatosReferenciasComponent
  ], imports: [
    CommonModule,
    ParticlesModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
    PagesRoutingModule
  ]
})
export class PagesModule { }
