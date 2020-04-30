import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { EmpleosComponent } from './empleos/empleos.component';
import { HomeComponent } from './home/home.component';


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
        path: "empleos",
        component: EmpleosComponent,
        data: {
          layout: true
        }
      }, 
      {
        path: "home",
        component: HomeComponent,
        data: {
          layout: false
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
