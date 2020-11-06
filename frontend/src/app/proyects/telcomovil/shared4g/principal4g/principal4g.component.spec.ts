import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Principal4gComponent } from './principal4g.component';

describe('Principal4gComponent', () => {
  let component: Principal4gComponent;
  let fixture: ComponentFixture<Principal4gComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Principal4gComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Principal4gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
