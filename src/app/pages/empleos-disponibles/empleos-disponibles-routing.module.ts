import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleosDisponiblesComponent } from './empleos-disponibles.component';
import { EmpleosDisponiblesDetallesComponent } from './empleos-disponibles-detalles/empleos-disponibles-detalles.component';
import { AuthGuardService } from 'src/app/_services/guard';


const routes: Routes = [
  {
    path: "",
    component: EmpleosDisponiblesComponent
  },
  {
    path: "detalles/:id",
    component: EmpleosDisponiblesDetallesComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleosDisponiblesRoutingModule { }
