import { Component, OnInit } from '@angular/core';
import { OfertaLaboralService } from 'src/app/services/oferta-laboral.service';
import { OfertaLaboral } from 'src/app/models/ofertaLaboral';
import { ConfigBase } from 'src/app/models/configBase';
import { LocalidadService } from 'src/app/services/localidad.service';
import { AreaService } from 'src/app/services/area.service';
import { Localidad } from 'src/app/models/localidad';
import { DateFormatter } from 'src/app/utils/utils';
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private apiOferta: OfertaLaboralService, 
    private apiLocalidades: LocalidadService,
    private apiAreas: AreaService) { }

  ofertas: OfertaLaboral[] = [];
  areas: ConfigBase[] = [];
  localidades: Localidad[] = [];
  dateFormatter = new DateFormatter();
  loading = false;
  
  //Pagination data
  filters = {
    buscar: null,
    itemspp: 10,
    areas: [],
    localidades: []
  }
  p: number = 1;
  itemspp: number = 10;
  total: number;
  // End Pagination data //

  ngOnInit(): void {
    this.getOfertas(this.p);
    this.getDatos();
    $("select").selectpicker();
  }

  getOfertas(page){
    this.loading =  true;
    this.apiOferta.getOfertasLaborales(page, this.filters.buscar, this.filters.itemspp, this.filters.areas, this.filters.localidades).subscribe(
      data => {
        this.ofertas = data.items;
        for( let i=0; i<this.ofertas.length; i++ ){
          this.ofertas[i].fecha_creacion = this.dateFormatter.getDate(this.ofertas[i].fecha_creacion); 
        }
        this.p = page;
        this.total = data.total;
        this.itemspp = this.filters.itemspp;
        this.loading = false;
      }
    )
  }

  getDatos(){
    this.apiLocalidades.getLocalidades().subscribe(
      data => {
        this.localidades = data;
        setTimeout(()=>{
          $('select').selectpicker('refresh');
        },0)
      }
    )

    this.apiAreas.getAreas().subscribe(
      data => {
        this.areas = data;
        setTimeout(()=>{
          $('select').selectpicker('refresh');
        },0)
      }
    )
  }

  limpiarFiltros(){
    this.filters.buscar = null;
    this.filters.itemspp = 10;
    this.filters.areas = [];
    this.filters.localidades = [];
    setTimeout(()=>{
      $('select').selectpicker('refresh');
    },0)
    this.getOfertas(1);
  }
}
