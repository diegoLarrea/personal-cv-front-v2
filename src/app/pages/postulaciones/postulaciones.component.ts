import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { PostulacionService } from 'src/app/_services/postulacion.service';
import { ToastrService } from 'ngx-toastr';
import { Postulacion } from 'src/app/_models/postulacion';
import { DateFormatter } from 'src/app/_utils/date.formatter';

@Component({
  selector: 'app-postulaciones',
  templateUrl: './postulaciones.component.html',
  styleUrls: ['./postulaciones.component.css']
})
export class PostulacionesComponent implements OnInit {

  constructor(private auth: AuthenticationService,
    private apiPostulacion: PostulacionService,
    private toastr: ToastrService) {}

  postulaciones: Postulacion[] = [];
  dateFormatter = new DateFormatter();
  loading = true;
  ngOnInit(): void {
    this.getPostulaciones();
  }

  getPostulaciones(){
    this.apiPostulacion.get().subscribe(
      data =>{
        this.postulaciones = data;

        for(let i=0; i<this.postulaciones.length; i++){
          this.postulaciones[i].fecha_postulacion = this.dateFormatter.getDate(this.postulaciones[i].fecha_postulacion);
        }

        this.loading = false;
      }
    )
  }

  eliminarModal = {id:null,pos:null}
  eliminarPostulacion(){
    this.apiPostulacion.delete(this.eliminarModal.id).subscribe(
      data => {
        this.toastr.success("Postulación eliminada");
        this.postulaciones.splice(this.eliminarModal.pos,1);
        this.eliminarModal.id = null;
        this.eliminarModal.pos = null;
      }
    )
  }
}
