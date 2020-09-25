import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmovilComponent } from './loginmovil.component';

describe('LoginmovilComponent', () => {
  let component: LoginmovilComponent;
  let fixture: ComponentFixture<LoginmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
