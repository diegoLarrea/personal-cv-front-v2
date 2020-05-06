import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/_services/persona.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Persona } from 'src/app/_models/persona';
declare var $:any;
@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.css']
})
export class CargarCvComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private apiPersona: PersonaService,
    private auth: AuthenticationService) { }

  img = null;
  persona: Persona = new Persona();
  ngOnInit(): void {
    this.activaTab('datos-personales');
    this.apiPersona.getByUserId(this.auth.getUser()).subscribe(
      data => {
        this.persona = data;
        if(this.persona.foto_perfil != null){
          this.img = this.persona.foto_perfil;
        }
      }
    )
  }

  activaTab(tab){
    $(`#${tab}`).tab("show");
  }

  selectImage(){
    $("#profile").click();
  }

  async handleFiles(files:FileList){
    let file: File = files.item(0);
    let fileExtension = files.item(0).name.split('.')[1];
    if(fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'jpeg' ){
      let img = await this.toBase64(file);
      this.persona.foto_perfil = img;
      this.apiPersona.putByUserId(this.persona.user, this.persona).subscribe(
        data => {
          this.persona = data;
          this.img = this.persona.foto_perfil;
        }
      )
    }else{
      this.toastr.error("Tipo de archivo no permitido");
    }

    console.log(this.img); 
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
