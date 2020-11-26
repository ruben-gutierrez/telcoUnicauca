import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Redes4gmovilComponent } from './redes4gmovil.component';

describe('Redes4gmovilComponent', () => {
  let component: Redes4gmovilComponent;
  let fixture: ComponentFixture<Redes4gmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Redes4gmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Redes4gmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
