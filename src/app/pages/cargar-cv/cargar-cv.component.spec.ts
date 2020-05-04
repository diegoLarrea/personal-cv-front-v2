import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarCvComponent } from './cargar-cv.component';

describe('CargarCvComponent', () => {
  let component: CargarCvComponent;
  let fixture: ComponentFixture<CargarCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
