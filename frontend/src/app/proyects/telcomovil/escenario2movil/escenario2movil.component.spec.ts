import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Escenario2movilComponent } from './escenario2movil.component';

describe('Escenario2movilComponent', () => {
  let component: Escenario2movilComponent;
  let fixture: ComponentFixture<Escenario2movilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Escenario2movilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Escenario2movilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
