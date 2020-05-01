import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosReferenciasComponent } from './datos-referencias.component';

describe('DatosReferenciasComponent', () => {
  let component: DatosReferenciasComponent;
  let fixture: ComponentFixture<DatosReferenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosReferenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
