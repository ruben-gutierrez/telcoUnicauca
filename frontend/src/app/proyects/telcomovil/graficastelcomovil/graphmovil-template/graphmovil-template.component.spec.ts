import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphmovilTemplateComponent } from './graphmovil-template.component';

describe('GraphmovilTemplateComponent', () => {
  let component: GraphmovilTemplateComponent;
  let fixture: ComponentFixture<GraphmovilTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphmovilTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphmovilTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
