import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosExperienciasComponent } from './datos-experiencias.component';

describe('DatosExperienciasComponent', () => {
  let component: DatosExperienciasComponent;
  let fixture: ComponentFixture<DatosExperienciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosExperienciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosExperienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
