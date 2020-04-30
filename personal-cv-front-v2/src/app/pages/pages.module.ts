import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticlesModule } from 'angular-particle';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { EmpleosComponent } from './empleos/empleos.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [PagesComponent, EmpleosComponent, HomeComponent],
  imports: [
    CommonModule,
    ParticlesModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
