import { Component, OnInit } from '@angular/core';
import { OfertaLaboralService } from 'src/app/_services/ofertaLaboral.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { OfertaLaboral } from 'src/app/_models/ofertaLaboral';
import { ConfigBase } from 'src/app/_models/configBase';
import { Localidad } from 'src/app/_models/localidad';
import { DateFormatter } from 'src/app/_utils/date.formatter';
declare var $:any;
@Component({
  selector: 'app-editar-empleo',
  templateUrl: './editar-empleo.component.html',
  styleUrls: ['./editar-empleo.component.css']
})
export class EditarEmpleoComponent implements OnInit {

  constructor(private apiEmpleo: OfertaLaboralService, 
    private toastr: ToastrService, 
    private router: Router, 
    private auth: AuthenticationService,
    private route: ActivatedRoute) {
      this.idEmpleo = this.route.snapshot.paramMap.get('id');
    }

  empleo: OfertaLaboral = new OfertaLaboral();
  areas: ConfigBase[] = [];
  localidades: Localidad[] = [];
  niveles: ConfigBase[] = [];
  dominios: ConfigBase[] = [];
  idEmpleo = null;
  dateFormatter = new DateFormatter();

  ngOnInit(): void {
    this.getEmpleo();
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

  getEmpleo(){
    this.apiEmpleo.getById(this.idEmpleo).subscribe(
      data => {
        this.empleo = data;
        this.empleo.fecha_creacion = this.dateFormatter.getDate(this.empleo.fecha_creacion);
        setTimeout(()=>{
          $('#requisitos').summernote('code', this.empleo.requisitos);
          $('#descripcion').summernote('code', this.empleo.descripcion);
        },0)
      }
    )
  }

  put(){
    this.empleo.requisitos = $('#requisitos').summernote('code');
    this.empleo.descripcion = $('#descripcion').summernote('code');
    this.empleo.usuario_modificacion = this.auth.getUser();

    if(this.check()){
      this.apiEmpleo.putEmpleo(this.empleo, this.idEmpleo).subscribe(
        data => {
          this.toastr.success("Empleo modificado");
          this.router.navigate(["portal/empleos"]);
        },
        error => {
          this.toastr.error("Error al modificar empleo");
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
