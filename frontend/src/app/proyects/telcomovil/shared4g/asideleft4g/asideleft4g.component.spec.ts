import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Asideleft4gComponent } from './asideleft4g.component';

describe('Asideleft4gComponent', () => {
  let component: Asideleft4gComponent;
  let fixture: ComponentFixture<Asideleft4gComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Asideleft4gComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Asideleft4gComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
