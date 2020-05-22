import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.activaTab('areas');
  }

  activaTab(tab) {
    $(`#${tab}`).tab("show");
  }
}
