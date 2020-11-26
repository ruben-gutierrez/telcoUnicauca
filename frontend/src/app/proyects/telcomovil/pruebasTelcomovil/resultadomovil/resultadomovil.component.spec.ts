import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadomovilComponent } from './resultadomovil.component';

describe('ResultadomovilComponent', () => {
  let component: ResultadomovilComponent;
  let fixture: ComponentFixture<ResultadomovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadomovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
