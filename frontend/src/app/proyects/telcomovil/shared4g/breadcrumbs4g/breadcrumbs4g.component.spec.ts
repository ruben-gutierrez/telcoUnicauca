import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Breadcrumbs4gComponent } from './breadcrumbs4g.component';

describe('Breadcrumbs4gComponent', () => {
  let component: Breadcrumbs4gComponent;
  let fixture: ComponentFixture<Breadcrumbs4gComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Breadcrumbs4gComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Breadcrumbs4gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
