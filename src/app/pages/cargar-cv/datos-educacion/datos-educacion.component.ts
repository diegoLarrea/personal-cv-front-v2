import { Component, OnInit, Input} from '@angular/core';
import { EducacionService } from 'src/app/_services/educacion.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Educacion } from 'src/app/_models/educacion';
import { Paises } from 'src/app/_utils/paises';
import { ToastrService } from 'ngx-toastr';
import { FileModel } from 'src/app/_models/file';
import { Idioma } from 'src/app/_models/idioma';
declare var $: any;
@Component({
  selector: 'app-datos-educacion',
  templateUrl: './datos-educacion.component.html',
  styleUrls: ['./datos-educacion.component.css']
})
export class DatosEducacionComponent implements OnInit {

  constructor(private apiEdu: EducacionService,
    private auth: AuthenticationService,
    private toastr: ToastrService) { }

  educacion: Educacion[] = [];
  idiomas: Idioma[] = [];
  paises = [];
  grados = ["Secundaria", "Universitaria", "Curso", "Postgrado", "Maestría", "Especilización", "Doctorado"];
  idiomasSelect = [
    {
      id: "B",
      nombre: "Básico"
    },
    {
      id: "I",
      nombre: "Intermedio"
    },
    {
      id: "A",
      nombre: "Avanzado"
    },{
      id: "N",
      nombre: "Nativo"
    }
  ]
  ngOnInit(): void {
    this.paises = Paises.paises;
    this.getEducacion();
    this.getIdiomas();
  }

  getEducacion() {
    this.apiEdu.get().subscribe(
      data => {
        this.educacion = data;
        this.educacion.push(new Educacion());
        for(let i=0; i<this.educacion.length; i++){
          if(this.educacion[i].id != null){
            this.educacion[i].documento = JSON.parse(this.educacion[i].documento);
          }
        }
      }
    )
  }

  postEducacion(edu: Educacion) {
    if (this.check(edu)) {
      edu.user = Number(this.auth.getUser());
      this.apiEdu.post(edu).subscribe(
        data => {
          this.toastr.success("Dato académico agregado");
          this.getEducacion();
        },
        error => {
          this.toastr.error("Error al guardar dato académico");
        }
      )

    }
  }

  putEducacion(edu: Educacion) {
    if (this.check(edu)) {
      this.apiEdu.put(edu, edu.id).subscribe(
        data => {
          this.toastr.success("Dato académico actualizado");
          // this.getEducacion();
        },
        error => {
          this.toastr.error("Error al actualizar dato académico");
        }
      )

    }
  }

  deleteEducacion(id) {
    this.apiEdu.delete(id).subscribe(
      data => {
        this.toastr.success("Dato académico eliminado");
        this.getEducacion();
      },
      error => {
        this.toastr.error("Error al eliminar dato académico");
      }
    )
  }

  check(obj: Educacion) {
    if (
      obj.institucion == null ||
      obj.nivel == null ||
      obj.pais == null ||
      obj.desde == null ||
      obj.titulo == null ||
      obj.documento == null
    ) {
      this.toastr.error("Complete los campos");
      return false;
    }

    return true;
  }

  async handleFiles(edu: Educacion, files: FileList, j) {
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
          $(`#input-file-label-${j}`).html(name);
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

  getIdiomas(){
    this.apiEdu.getIdioma().subscribe(
      data => {
        this.idiomas = data;
        this.idiomas.push(new Idioma());
      }
    )
  }

  postIdioma(obj: Idioma){
    if (this.checkIdioma(obj)) {
      obj.user = Number(this.auth.getUser());
      this.apiEdu.postIdioma(obj).subscribe(
        data => {
          this.toastr.success("Idioma agregado");
          this.getIdiomas();
        },
        error => {
          this.toastr.error("Error al guardar idioma");
        }
      )

    }
  }

  putIdioma(obj:Idioma){
    if (this.checkIdioma(obj)) {
      this.apiEdu.putIdioma(obj, obj.id).subscribe(
        data => {
          this.toastr.success("Idioma actualizado");
          // this.getEducacion();
        },
        error => {
          this.toastr.error("Error al actualizar idioma");
        }
      )

    }
  }

  deleteIdioma(id){
    this.apiEdu.deleteIdioma(id).subscribe(
      data => {
        this.toastr.success("Idioma eliminado");
        this.getIdiomas();
      },
      error => {
        this.toastr.error("Error al eliminar idioma");
      }
    )
  }

  checkIdioma(obj:Idioma){
    if(
      obj.idioma == null ||
      obj.habla == null ||
      obj.lee == null ||
      obj.escribe == null
    ){
      this.toastr.error("Complete los campos");
      return false;
    }
    return true;
  }
}
