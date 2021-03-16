import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficastelcomovilComponent } from './graficastelcomovil.component';

describe('GraficastelcomovilComponent', () => {
  let component: GraficastelcomovilComponent;
  let fixture: ComponentFixture<GraficastelcomovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficastelcomovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficastelcomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
