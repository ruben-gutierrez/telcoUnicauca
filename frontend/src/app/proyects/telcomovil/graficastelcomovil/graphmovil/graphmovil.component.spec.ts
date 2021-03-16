import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphmovilComponent } from './graphmovil.component';

describe('GraphmovilComponent', () => {
  let component: GraphmovilComponent;
  let fixture: ComponentFixture<GraphmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
