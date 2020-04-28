import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  eye = true;
  ngOnInit(): void {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'background-color': '#402661'
      // 'background-color': '#a4508b',
      // 'background-image': 'linear-gradient(326deg, #a4508b 0%, #5f0a87 74%)'
    };
    this.myParams = {
      particles: {
        number: {
          value: 75,
        },
        color: {
          value: '#ffffff'
        },
        shape: {
          type: 'circle',
        },
      }
    };
  }

}
