import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/_services/persona.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/_models/user';
import { Persona } from 'src/app/_models/persona';
import { Educacion } from 'src/app/_models/educacion';
import { Idioma } from 'src/app/_models/idioma';
import { Experiencia } from 'src/app/_models/experiencia';
import { Referencia } from 'src/app/_models/referencia';
declare var $: any;
declare var loadImage: any;
@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  user = null;
  persona: Persona = new Persona();
  educacion: Educacion[] = [];
  idiomas: Idioma[] = []; 
  experiencias: Experiencia[] = [];
  referencias: Referencia[] = [];
  nivelesIdiomas = {
    B: "Básico",
    I: "Intermedio",
    A: "Avanzado",
    N: "Nativo"
  }
  constructor(private apiPersona: PersonaService, private auth: AuthenticationService) {
    this.user = this.auth.getUser();
  }

  ngOnInit(): void {
    this.getDatosPersonales();
  }

  getDatosPersonales(){
    this.apiPersona.getAllData().subscribe(
      data => {
        this.persona = data.persona;
        this.educacion = data.educacion;
        this.idiomas = data.idiomas;
        this.experiencias = data.experiencias;
        this.referencias = data.referencias;
        this.fotoPerfil();
      }
    )
  }

  async fotoPerfil() {

    let img = document.createElement("img");
    if (this.persona.foto_perfil != null) {
      let fileJSON = JSON.parse(this.persona.foto_perfil); 
      let file: File = await this.fromBase64ToFile(fileJSON.file, fileJSON.filename);
      loadImage(
        file,
        (img: HTMLImageElement) => {
          $(".foto-perfil").remove();
          img.classList.add("foto-perfil"); 
          document.getElementById("foto-perfil-view").prepend(img);
        },
        { 
          maxWidth: 80,
          orientation:true 
        }
      )
    } else {
      img.src = "assets/images/home-2.png";
      img.classList.add("foto-perfil");
      img.style.height = "auto";
      img.style.width = "80px";
      document.getElementById("foto-perfil-view").appendChild(img);
    }

  }

  fromBase64ToFile (dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
