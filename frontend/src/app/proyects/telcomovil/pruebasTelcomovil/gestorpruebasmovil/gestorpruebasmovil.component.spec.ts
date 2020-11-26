import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorpruebasmovilComponent } from './gestorpruebasmovil.component';

describe('GestorpruebasmovilComponent', () => {
  let component: GestorpruebasmovilComponent;
  let fixture: ComponentFixture<GestorpruebasmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorpruebasmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorpruebasmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
