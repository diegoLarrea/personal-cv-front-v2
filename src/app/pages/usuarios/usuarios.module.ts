import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
