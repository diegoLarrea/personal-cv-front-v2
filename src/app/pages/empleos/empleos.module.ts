import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleosRoutingModule } from './empleos-routing.module';
import { AgregarEmpleoComponent } from './agregar-empleo/agregar-empleo.component';
import { ListarEmpleoComponent } from './listar-empleo/listar-empleo.component';
import { EditarEmpleoComponent } from './editar-empleo/editar-empleo.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [AgregarEmpleoComponent, ListarEmpleoComponent, EditarEmpleoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
    EmpleosRoutingModule
  ]
})
export class EmpleosModule { }
