import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Aside4gComponent } from './aside4g.component';

describe('Aside4gComponent', () => {
  let component: Aside4gComponent;
  let fixture: ComponentFixture<Aside4gComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Aside4gComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Aside4gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
