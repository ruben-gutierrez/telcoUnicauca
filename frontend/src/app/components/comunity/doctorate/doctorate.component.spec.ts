import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorateComponent } from './doctorate.component';

describe('DoctorateComponent', () => {
  let component: DoctorateComponent;
  let fixture: ComponentFixture<DoctorateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
