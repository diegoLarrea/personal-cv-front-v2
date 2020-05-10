import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertaLaboralService } from 'src/app/_services/ofertaLaboral.service';
import { OfertaLaboral } from 'src/app/_models/ofertaLaboral';
import { DateFormatter } from 'src/app/_utils/date.formatter';
import { Postulacion } from 'src/app/_models/postulacion';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PostulacionService } from 'src/app/_services/postulacion.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empleos-disponibles-detalles',
  templateUrl: './empleos-disponibles-detalles.component.html',
  styleUrls: ['./empleos-disponibles-detalles.component.css']
})
export class EmpleosDisponiblesDetallesComponent implements OnInit {

  idEmpleo = null;
  dateFormatter = new DateFormatter();
  empleo: OfertaLaboral = new OfertaLaboral();
  disabledBtn = false;
  constructor(private route: ActivatedRoute, 
    private apiEmpleo: OfertaLaboralService, 
    private auth: AuthenticationService,
    private apiPostulacion: PostulacionService,
    private toastr: ToastrService) { 
    this.idEmpleo = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getEmpleo();
  }

  getEmpleo(){
    this.apiEmpleo.getEmpleoById(this.idEmpleo).subscribe(
      data => {
        this.empleo = data.empleo;
        this.empleo.fecha_creacion = this.dateFormatter.getDate(this.empleo.fecha_creacion);
        this.disabledBtn = data.disabled;
      }
    )
  }

  postularse(){
    if(!this.disabledBtn){
      let postulacion = new Postulacion();
      postulacion.empleo = this.idEmpleo;
      postulacion.user = Number(this.auth.getUser());
      this.apiPostulacion.post(postulacion).subscribe(
        data => {
          this.toastr.success("Postulacion guardada");
          this.disabledBtn = true;
        }
      )
    }
  }
}
