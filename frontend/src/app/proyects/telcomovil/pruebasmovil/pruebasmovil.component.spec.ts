import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasmovilComponent } from './pruebasmovil.component';

describe('PruebasmovilComponent', () => {
  let component: PruebasmovilComponent;
  let fixture: ComponentFixture<PruebasmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebasmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
