import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavImsComponent } from './nav-ims.component';

describe('NavImsComponent', () => {
  let component: NavImsComponent;
  let fixture: ComponentFixture<NavImsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavImsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavImsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
