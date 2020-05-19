import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/_services/persona.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Persona } from 'src/app/_models/persona';

declare var $: any;
declare var loadImage: any;
@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.css']
})
export class CargarCvComponent implements OnInit {

  constructor(private toastr: ToastrService,
    private apiPersona: PersonaService,
    private auth: AuthenticationService) { }

  cropper = null;
  persona: Persona = new Persona();
  loading = true;
  ngOnInit(): void {
    this.activaTab('datos-personales');
    this.apiPersona.getByUserId(this.auth.getUser()).subscribe(
      data => {
        this.persona = data;
        this.fotoPerfil();
      }
    )
  }

  activaTab(tab) {
    $(`#${tab}`).tab("show");
  }

  selectImage() {
    $("#profile").click();
  }

  async handleFiles(event) {
    if(event.target.files != null){
      let selectedFile: File = event.target.files[0];
      this.persona.foto_perfil = JSON.stringify({filename: event.target.files[0].name, file:await this.toBase64(selectedFile)});  
      this.apiPersona.putByUserId(this.persona.user, this.persona).subscribe(
        data => {
          loadImage(
            selectedFile,
            function (img) {
              $(".foto-perfil").remove();
              img.classList.add("foto-perfil");
              document.getElementById("foto-perfil-view").appendChild(img);
            },
            { 
              maxWidth: 100,
              orientation:true 
            }
          )
        }
      )
    }
  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

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
          document.getElementById("foto-perfil-view").appendChild(img);
        },
        { 
          maxWidth: 100,
          orientation:true 
        }
      )
    } else {
      img.src = "assets/images/home-2.png";
      img.classList.add("foto-perfil");
      document.getElementById("foto-perfil-view").appendChild(img);
    }
    this.loading = false;
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
