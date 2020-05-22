import { Component, OnInit } from '@angular/core';
import { Localidad } from 'src/app/_models/localidad';
import { LocalidadService } from 'src/app/_services/localidades.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {

  constructor(private apiLocalidad: LocalidadService, private toastr: ToastrService) { }

  localidades: Localidad[] = [];
  p: number = 1;
  itemspp: number = 10;

  localidadEdit: Localidad = new Localidad();
  localidadAdd: Localidad = new Localidad();
  localidadDelete: Localidad = new Localidad();
  localidadDeletePos = null;

  ngOnInit(): void {
    this.getLocalidades();
  }

  getLocalidades(){
    this.apiLocalidad.getLocalidades().subscribe(
      data => {
        this.localidades = data;
      }
    )
  }

  putLocalidad(){
    if(this.check(this.localidadEdit)){
      this.apiLocalidad.putLocalidad(this.localidadEdit.id, this.localidadEdit).subscribe(
        data => {
          this.toastr.success("Localidad modificada");
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }

  }

  postLocalidad(){
    if(this.check(this.localidadAdd)){
      this.apiLocalidad.postLocalidad(this.localidadAdd).subscribe(
        data => {
          this.toastr.success("Localidad agregada");
          this.localidadAdd.id = data.id;
          this.localidades.push(this.localidadAdd);
          this.localidadAdd = new Localidad();
        }
      )
    }else{
      this.toastr.error("Complete los campos");
    }
    
  }

  deleteLocalidad(){
    this.apiLocalidad.deleteLocalidad(this.localidadDelete.id).subscribe(
      data => {
        this.toastr.success("Localidad eliminada");
        this.localidades.splice(this.localidadDeletePos, 1);
      }
    )
  }

  check (obj: Localidad) {
    return obj.nombre != null && obj.nombre != "" 
    && obj.direccion != null && obj.direccion != ""
  }
}
