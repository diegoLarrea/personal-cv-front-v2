import { Component, OnInit } from '@angular/core';
import { Referencia } from 'src/app/_models/referencia';
import { ReferenciaService } from 'src/app/_services/referencia.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datos-referencias',
  templateUrl: './datos-referencias.component.html',
  styleUrls: ['./datos-referencias.component.css']
})
export class DatosReferenciasComponent implements OnInit {

  constructor(private apiRef: ReferenciaService,
    private auth: AuthenticationService,
    private toastr: ToastrService) { }

  referencias: Referencia[] = [];
  collapseRef = [];
  ngOnInit(): void {
    this.getReferencias();
  }

  getReferencias() {
    this.apiRef.get().subscribe(
      data => {
        this.referencias = data;
        this.referencias.push(new Referencia());
        for(let i=0; i<this.referencias.length; i++){
          this.collapseRef.push(true);
        }
      }
    )
  }

  postReferencia(ref: Referencia) {
    if (this.check(ref)) {
      ref.user = Number(this.auth.getUser());
      this.apiRef.post(ref).subscribe(
        data => {
          this.referencias[this.referencias.length-1] = data;
          this.collapseRef[this.referencias.length-1] = true;
          this.referencias.push(new Referencia());
          this.collapseRef.push(true);
          this.toastr.success("Referencia agregada");
        },
        error => {
          this.toastr.error("Error al guardar referencia");
        }
      )

    }
  }

  putReferencia(ref: Referencia) {
    if (this.check(ref)) {
      this.apiRef.put(ref, ref.id).subscribe(
        data => {
          this.toastr.success("Referencia actualizada");
          // this.getEducacion();
        },
        error => {
          this.toastr.error("Error al actualizar referencia");
        }
      )

    }
  }

  deleteReferencia(id, j) {
    this.apiRef.delete(id).subscribe(
      data => {
        this.referencias.splice(j,1);
        this.collapseRef.splice(j,1);
        this.toastr.success("Experiencia eliminada");
      },
      error => {
        this.toastr.error("Error al eliminar experiencia");
      }
    )
  }

  check(obj: Referencia) {
    if (
      obj.nombre == null ||
      obj.parentesco == null ||
      obj.contacto == null
    ) {
      this.toastr.error("Complete los campos");
      return false;
    }

    return true;
  }
}
