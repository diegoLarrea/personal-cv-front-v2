import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosDisponiblesComponent } from './empleos-disponibles.component';

describe('EmpleosDisponiblesComponent', () => {
  let component: EmpleosDisponiblesComponent;
  let fixture: ComponentFixture<EmpleosDisponiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleosDisponiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleosDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
