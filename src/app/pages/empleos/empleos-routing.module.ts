import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListarEmpleoComponent } from './listar-empleo/listar-empleo.component';
import { AgregarEmpleoComponent } from './agregar-empleo/agregar-empleo.component';
import { EditarEmpleoComponent } from './editar-empleo/editar-empleo.component';


const routes: Routes = [
  {
    path: "",
    component: ListarEmpleoComponent
  },
  {
    path: "agregar",
    component: AgregarEmpleoComponent
  },
  {
    path: "editar/:id",
    component: EditarEmpleoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleosRoutingModule { }
