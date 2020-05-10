import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosDisponiblesDetallesComponent } from './empleos-disponibles-detalles.component';

describe('EmpleosDisponiblesDetallesComponent', () => {
  let component: EmpleosDisponiblesDetallesComponent;
  let fixture: ComponentFixture<EmpleosDisponiblesDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleosDisponiblesDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleosDisponiblesDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
