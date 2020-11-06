import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Escenario1movilComponent } from './escenario1movil.component';

describe('Escenario1movilComponent', () => {
  let component: Escenario1movilComponent;
  let fixture: ComponentFixture<Escenario1movilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Escenario1movilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Escenario1movilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
