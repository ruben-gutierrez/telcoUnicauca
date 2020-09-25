import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Contacto4gComponent } from './contacto4g.component';

describe('Contacto4gComponent', () => {
  let component: Contacto4gComponent;
  let fixture: ComponentFixture<Contacto4gComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Contacto4gComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Contacto4gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
