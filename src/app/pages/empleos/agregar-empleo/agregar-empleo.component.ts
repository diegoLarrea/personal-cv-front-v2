import { Component, OnInit } from '@angular/core';
import { OfertaLaboral } from 'src/app/_models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/_services/ofertaLaboral.service';
import { ConfigBase } from 'src/app/_models/configBase';
import { Localidad } from 'src/app/_models/localidad';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
declare var $:any;
@Component({
  selector: 'app-agregar-empleo',
  templateUrl: './agregar-empleo.component.html',
  styleUrls: ['./agregar-empleo.component.css']
})
export class AgregarEmpleoComponent implements OnInit {

  constructor(private apiEmpleo: OfertaLaboralService, private toastr: ToastrService, private router: Router, private auth: AuthenticationService) { }

  empleo: OfertaLaboral = new OfertaLaboral();
  areas: ConfigBase[] = [];
  localidades: Localidad[] = [];
  niveles: ConfigBase[] = [];
  dominios: ConfigBase[] = [];

  ngOnInit(): void {
    this.getFiltros();
    $('.editor').summernote({
      toolbar: [
        ['style', ['bold', 'italic', 'underline']],
        ['para', ['ul', 'ol']]
      ],
      disableDragAndDrop: false
    });
  }

  getFiltros(){
    this.apiEmpleo.obtenerFiltros().subscribe(
      data => {
        this.areas = data.areas;
        this.localidades = data.localidades;
        this.niveles = data.niveles;
        this.dominios = data.dominios;
      }
    )
  }

  post(){
    this.empleo.requisitos = $('#requisitos').summernote('code');
    this.empleo.descripcion = $('#descripcion').summernote('code');
    this.empleo.usuario_creacion = this.auth.getUser();

    if(this.check()){
      this.apiEmpleo.postEmpleo(this.empleo).subscribe(
        data => {
          this.toastr.success("Empleo guardado");
          this.router.navigate(["portal/empleos"]);
        },
        error => {
          this.toastr.error("Error al guardar empleo");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }

  }

  check(){
    return this.empleo.oportunidad != null && this.empleo.oportunidad != "" 
    && this.empleo.descripcion != null && this.empleo.descripcion != ""
    && this.empleo.requisitos != null && this.empleo.requisitos != ""
    && this.empleo.tipo != null && this.empleo.tipo != ""
    && this.empleo.area != null
    && this.empleo.localidad != null
    && this.empleo.nivel != null
    && this.empleo.dominio != null 
  }
}
