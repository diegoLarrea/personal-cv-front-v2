import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  layout = true;
  constructor(private route:ActivatedRoute) {
    this.layout = route.snapshot.firstChild.data.layout; 
    console.log(this.layout);
  }

  hasCollapse = false;
  ngOnInit(): void {
  }

  sideFunction(){this.hasCollapse = !$("body").hasClass("sidebar-collapse");}
}
