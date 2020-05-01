import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/_services/areas.service';
import { LocalidadService } from 'src/app/_services/localidades.service';
import { ConfigBase } from 'src/app/_models/configBase';
import { Localidad } from 'src/app/_models/localidad';
import { OfertaLaboral } from 'src/app/_models/ofertaLaboral';
import { OfertaLaboralService } from 'src/app/_services/ofertaLaboral.service';
import { DateFormatter } from 'src/app/_utils/date.formatter';
declare var $:any;
@Component({
  selector: 'app-empleos-disponibles',
  templateUrl: './empleos-disponibles.component.html',
  styleUrls: ['./empleos-disponibles.component.css']
})
export class EmpleosDisponiblesComponent implements OnInit {

  constructor(private apiArea: AreaService, private apiLocalidad: LocalidadService, private apiOferta: OfertaLaboralService) { }
  
  ofertas: OfertaLaboral[] = [];
  areas: ConfigBase[] = [];
  localidades: Localidad[] = [];
  loading = true;
  dateFormatter = new DateFormatter();

  
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
    this.getAreas();
    this.getLocalidades();
    $('select').selectpicker();
  }

  getAreas(){
    this.apiArea.getAreas().subscribe(
      data => {
        this.areas = data;
        setTimeout(()=>{
          $('select').selectpicker('refresh');
        },0)
      }
    )
  }
  getLocalidades(){
    this.apiLocalidad.getLocalidades().subscribe(
      data => {
        this.localidades = data;
        setTimeout(()=>{
          $('select').selectpicker('refresh');
        },0)
      }
    )
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
