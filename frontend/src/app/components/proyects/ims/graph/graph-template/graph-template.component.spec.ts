import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTemplateComponent } from './graph-template.component';

describe('GraphTemplateComponent', () => {
  let component: GraphTemplateComponent;
  let fixture: ComponentFixture<GraphTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
