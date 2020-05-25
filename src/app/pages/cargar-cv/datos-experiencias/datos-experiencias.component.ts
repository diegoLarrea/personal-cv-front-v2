import { Component, OnInit } from '@angular/core';
import { ExperienciaService } from 'src/app/_services/experiencia.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Experiencia } from 'src/app/_models/experiencia';
import { FileModel } from 'src/app/_models/file';
declare var $:any;
@Component({
  selector: 'app-datos-experiencias',
  templateUrl: './datos-experiencias.component.html',
  styleUrls: ['./datos-experiencias.component.css']
})
export class DatosExperienciasComponent implements OnInit {

  constructor(private apiExp: ExperienciaService,
    private auth: AuthenticationService,
    private toastr: ToastrService) { }

  rubros = ["Rubro 1", "Rubro 2","Rubro 3","Rubro 4","Rubro 5","Rubro 6","Rubro 7","Rubro 8","Rubro 9","Rubro 10"];
  experiencias: Experiencia[] = [];
  collapseExp = [];
  ngOnInit(): void {
    this.getExperiencias();
  }

  getExperiencias() {
    this.apiExp.get().subscribe(
      data => {
        this.experiencias = data;
        this.experiencias.push(new Experiencia());
        for(let i=0; i<this.experiencias.length; i++){
          if(this.experiencias[i].id != null){
            this.experiencias[i].documento = JSON.parse(this.experiencias[i].documento);
          }
          this.collapseExp.push(true);
        }
      }
    )
  }

  postExperiencia(exp: Experiencia) {
    if (this.check(exp)) {
      exp.user = Number(this.auth.getUser());
      this.apiExp.post(exp).subscribe(
        data => {
          this.experiencias[this.experiencias.length-1] = data;
          this.experiencias[this.experiencias.length-1].documento = JSON.parse(this.experiencias[this.experiencias.length-1].documento);
          this.collapseExp[this.experiencias.length-1] = true;
          this.experiencias.push(new Experiencia());
          this.collapseExp.push(true);
          this.toastr.success("Experiencia agregada");
        },
        error => {
          this.toastr.error("Error al guardar experiencia");
        }
      )

    }
  }

  putExperiencia(exp: Experiencia) {
    if (this.check(exp)) {
      this.apiExp.put(exp, exp.id).subscribe(
        data => {
          this.toastr.success("Experiencia actualizada");
          // this.getEducacion();
        },
        error => {
          this.toastr.error("Error al actualizar experiencia");
        }
      )

    }
  }

  deleteExperiencia(id, j) {
    this.apiExp.delete(id).subscribe(
      data => {
        this.experiencias.splice(j,1);
        this.collapseExp.splice(j,1);
        this.toastr.success("Experiencia eliminada");
      },
      error => {
        this.toastr.error("Error al eliminar experiencia");
      }
    )
  }

  check(obj: Experiencia) {
    if (
      obj.institucion == null ||
      obj.rubro == null ||
      obj.trabajando == null ||
      obj.desde == null ||
      obj.tareas == null ||
      obj.superior_contacto == null ||
      obj.superior_nombre == null ||
      obj.superior_puesto == null ||
      obj.documento == null
    ) {
      this.toastr.error("Complete los campos");
      return false;
    }

    return true;
  }

  async handleFiles(edu: Experiencia, files: FileList, j) {
    if(files != null){
      let file: File = files.item(0);
      let fileExtension = files.item(0).name.substring(files.item(0).name.lastIndexOf('.') + 1);
      let size = files.item(0).size / 1000000; // En mb
      let name: string = files.item(0).name;
      if ((fileExtension == 'png' ||
        fileExtension == 'jpg' ||
        fileExtension == 'jpeg' ||
        fileExtension == 'docx' ||
        fileExtension == 'pdf') && size <= 1) {
        let file64 = await this.toBase64(file);
        let fileModel = new FileModel();
        fileModel.filename = name;
        fileModel.file = file64.toString();
        edu.documento = JSON.stringify(fileModel);
        setTimeout(()=>{
          $(`#input-file-label-${j}-exp`).html(name);
        },0);
  
      } else {
        this.toastr.error("Tipo de archivo no permitido y/o tamaño de archivo excedido (1MB)");
      }
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  verArchivo(obj){
    let link = document.createElement("a");
    link.download = obj.filename;
    link.href = obj.file;
    link.click();
  }
}
