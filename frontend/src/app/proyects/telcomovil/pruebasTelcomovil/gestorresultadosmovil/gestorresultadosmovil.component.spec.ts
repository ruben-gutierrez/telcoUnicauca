import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorresultadosmovilComponent } from './gestorresultadosmovil.component';

describe('GestorresultadosmovilComponent', () => {
  let component: GestorresultadosmovilComponent;
  let fixture: ComponentFixture<GestorresultadosmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorresultadosmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorresultadosmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
