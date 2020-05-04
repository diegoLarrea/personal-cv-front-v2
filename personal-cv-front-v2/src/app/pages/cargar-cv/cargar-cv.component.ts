import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-cargar-cv',
  templateUrl: './cargar-cv.component.html',
  styleUrls: ['./cargar-cv.component.css']
})
export class CargarCvComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.activaTab('datos-personales');
  }

  activaTab(tab){
    $(`#${tab}`).tab("show");
  }
}
