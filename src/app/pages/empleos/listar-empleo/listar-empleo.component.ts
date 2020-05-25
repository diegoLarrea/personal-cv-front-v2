import { Component, OnInit } from '@angular/core';
import { TableMaganer } from 'src/app/_utils/table.manager';
import { OfertaLaboralService } from 'src/app/_services/ofertaLaboral.service';
import { OfertaLaboral } from 'src/app/_models/ofertaLaboral';
import { DateFormatter } from 'src/app/_utils/date.formatter';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/_services/excel.service';
declare var $:any;
@Component({
  selector: 'app-listar-empleo',
  templateUrl: './listar-empleo.component.html',
  styleUrls: ['./listar-empleo.component.css']
})
export class ListarEmpleoComponent implements OnInit {

  constructor(private apiEmpleo: OfertaLaboralService, private toastr: ToastrService, private excelService: ExcelService) {
    let headers = [
      { columnName: "#", by: null },
      { columnName: "Código", by: null },
      { columnName: "Portunidad", by: "oportunidad" },
      { columnName: "Fecha Creación", by: "fecha_creacion" },
      { columnName: "Creado por", by: null},
      { columnName: "Acciones", by: null }
    ];
    this.tableManager.init(headers, 3, "DESC");
  }

  tableManager = new TableMaganer();
  loading = true;
  empleos: OfertaLaboral[] = [];
  p: number = 1;
  total: number = null;
  dateFormatter = new DateFormatter();  
  areas = [];
  localidades = [];
  empleoActivar = new OfertaLaboral();
  empleoDesactivar = new OfertaLaboral();
  filters = {
    search: null,
    areas: null,
    localidades: null,
    activo: null
  }

  //Datos modal detalles
  empleoDetalle: OfertaLaboral = new OfertaLaboral();
  pm: number = 1;
  ngOnInit(): void {
    this.getEmpleos(1);
    this.getFiltros();
    $('select').selectpicker();
  }


  getEmpleos(page) {
    this.loading = true;
    this.tableManager.setFilters(this.filters);
    this.tableManager.params.page = page;
    this.apiEmpleo.getEmpleos(this.tableManager.params).subscribe(
      data => {
        this.empleos = data.items;
        this.total = data.total;
        this.p = page;
        this.loading = false;
        for( let i=0; i<this.empleos.length; i++ ){
          this.empleos[i].fecha_creacion = this.dateFormatter.getDate(this.empleos[i].fecha_creacion);
          this.empleos[i].vigencia = this.dateFormatter.getDate(this.empleos[i].vigencia); 
        };
      }
    )
  }

  limpiarFiltros() {
    this.filters.search = null;
    this.filters.areas = null;
    this.filters.localidades = null;
    this.filters.activo = null;

    this.tableManager.reset(3, "DESC");
    this.tableManager.setFilters(this.filters);

    setTimeout(()=> {
      $("select").selectpicker("refresh");
    }, 0)

    this.getEmpleos(1);
  }

  getFiltros(){
    this.apiEmpleo.obtenerFiltros().subscribe(
      data => {
        this.areas = data.areas;
        this.localidades = data.localidades;
        setTimeout(()=> {
          $("select").selectpicker("refresh");
        }, 0)
      }
    )
  }

  activarEmpleo(){
    this.apiEmpleo.activarEmpleo(this.empleoActivar.id).subscribe(
      data => {
        this.toastr.success("Empleo activado");
        this.empleoActivar.activo = true;
      }
    )
  }

  desactivarEmpleo(){
    this.apiEmpleo.desactivarEmpleo(this.empleoDesactivar.id).subscribe(
      data => {
        this.toastr.success("Empleo desactivado");
        this.empleoDesactivar.activo = false;
      }
    )
  }

  exportar(){
    let empleos = [...this.empleos];
    this.excelService.empleosExcel(empleos);
  }
}
