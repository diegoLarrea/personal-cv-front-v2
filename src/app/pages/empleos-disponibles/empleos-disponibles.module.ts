import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleosDisponiblesRoutingModule } from './empleos-disponibles-routing.module';
import { EmpleosDisponiblesComponent } from './empleos-disponibles.component';
import { EmpleosDisponiblesDetallesComponent } from './empleos-disponibles-detalles/empleos-disponibles-detalles.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [
    EmpleosDisponiblesComponent, 
    EmpleosDisponiblesDetallesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
    EmpleosDisponiblesRoutingModule
  ]
})
export class EmpleosDisponiblesModule { }
