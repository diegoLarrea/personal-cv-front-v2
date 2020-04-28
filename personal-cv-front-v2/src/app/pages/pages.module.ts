import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ParticlesModule } from 'angular-particle';


@NgModule({
  declarations: [PagesComponent, HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    ParticlesModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
