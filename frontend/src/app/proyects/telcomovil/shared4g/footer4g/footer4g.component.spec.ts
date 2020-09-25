import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer4gComponent } from './footer4g.component';

describe('Footer4gComponent', () => {
  let component: Footer4gComponent;
  let fixture: ComponentFixture<Footer4gComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Footer4gComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Footer4gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
