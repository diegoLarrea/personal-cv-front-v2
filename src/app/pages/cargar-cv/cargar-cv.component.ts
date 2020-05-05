import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $:any;
@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.css']
})
export class CargarCvComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  img = null;
  ngOnInit(): void {
    this.activaTab('datos-personales');
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
      this.img = await this.toBase64(file);
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
