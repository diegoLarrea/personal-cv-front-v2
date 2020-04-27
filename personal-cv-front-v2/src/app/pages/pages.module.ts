import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [PagesComponent, HomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
