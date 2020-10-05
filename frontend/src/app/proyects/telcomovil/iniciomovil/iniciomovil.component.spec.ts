import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciomovilComponent } from './iniciomovil.component';

describe('IniciomovilComponent', () => {
  let component: IniciomovilComponent;
  let fixture: ComponentFixture<IniciomovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciomovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
