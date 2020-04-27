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
  loadingAreas = true;
  loadingLocalidades = true;
  dateFormatter = new DateFormatter();

  ngOnInit(): void {
    this.getOfertas();
    this.getDatos();
    $("select").selectpicker();
  }

  getOfertas(){
    this.apiOferta.getOfertasLaborales().subscribe(
      data => {
        this.ofertas = data.items;
        for( let i=0; i<this.ofertas.length; i++ ){
          this.ofertas[i].fecha_creacion = this.dateFormatter.getDate(this.ofertas[i].fecha_creacion); 
        }
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
        this.loadingLocalidades = false;
      }
    )

    this.apiAreas.getAreas().subscribe(
      data => {
        this.areas = data;
        this.loadingAreas = false;
        setTimeout(()=>{
          $('select').selectpicker('refresh');
        },0)
      }
    )
  }

}
