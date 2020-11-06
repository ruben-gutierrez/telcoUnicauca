import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Header4gComponent } from './header4g.component';

describe('Header4gComponent', () => {
  let component: Header4gComponent;
  let fixture: ComponentFixture<Header4gComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Header4gComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Header4gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
