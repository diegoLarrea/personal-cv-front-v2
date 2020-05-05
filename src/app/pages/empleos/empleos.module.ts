import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleosRoutingModule } from './empleos-routing.module';
import { AgregarEmpleoComponent } from './agregar-empleo/agregar-empleo.component';
import { ListarEmpleoComponent } from './listar-empleo/listar-empleo.component';
import { EditarEmpleoComponent } from './editar-empleo/editar-empleo.component';


@NgModule({
  declarations: [AgregarEmpleoComponent, ListarEmpleoComponent, EditarEmpleoComponent],
  imports: [
    CommonModule,
    EmpleosRoutingModule
  ]
})
export class EmpleosModule { }
