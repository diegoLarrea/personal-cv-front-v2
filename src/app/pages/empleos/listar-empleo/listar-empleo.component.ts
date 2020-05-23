import { Component, OnInit } from '@angular/core';
import { TableMaganer } from 'src/app/_utils/table.manager';
import { OfertaLaboralService } from 'src/app/_services/ofertaLaboral.service';
import { OfertaLaboral } from 'src/app/_models/ofertaLaboral';
import { DateFormatter } from 'src/app/_utils/date.formatter';
declare var $:any;
@Component({
  selector: 'app-listar-empleo',
  templateUrl: './listar-empleo.component.html',
  styleUrls: ['./listar-empleo.component.css']
})
export class ListarEmpleoComponent implements OnInit {

  constructor(private apiEmpleo: OfertaLaboralService) {
    let headers = [
      { columnName: "#", by: null },
      { columnName: "Código", by: null },
      { columnName: "Portunidad", by: "oportunidad" },
      { columnName: "Fecha Creación", by: "fecha_creacion" },
      { columnName: "Creado por", by: null},
      { columnName: "Acciones", by: null }
    ];
    this.tableManager.init(headers, 2, "DESC");
  }

  tableManager = new TableMaganer();
  loading = true;
  empleos: OfertaLaboral[] = [];
  p: number = 1;
  total: number = null;
  dateFormatter = new DateFormatter();  
  areas = [];
  localidades = [];
  filters = {
    search: null,
    areas: null,
    localidades: null
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
        console.log(this.empleos);
      }
    )
  }

  limpiarFiltros() {
    this.filters.search = null;
    this.filters.areas = null;
    this.filters.localidades = null;

    this.tableManager.reset(2, "DESC");
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
}
