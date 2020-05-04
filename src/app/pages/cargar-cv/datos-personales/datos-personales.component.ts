import { Component, OnInit } from '@angular/core';
import { Paises } from 'src/app/_utils/paises';
declare var $:any;
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {

  paises = [];
  checkFamiliares = false;
  checkHeTrabajado = true;

  constructor() { }

  ngOnInit(): void {
    this.paises = Paises.paises;
    setTimeout(()=>{
      $("select").selectpicker('refresh');
    },0)

  }

}
