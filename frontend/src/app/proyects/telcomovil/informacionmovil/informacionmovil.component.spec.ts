import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionmovilComponent } from './informacionmovil.component';

describe('InformacionmovilComponent', () => {
  let component: InformacionmovilComponent;
  let fixture: ComponentFixture<InformacionmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformacionmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
