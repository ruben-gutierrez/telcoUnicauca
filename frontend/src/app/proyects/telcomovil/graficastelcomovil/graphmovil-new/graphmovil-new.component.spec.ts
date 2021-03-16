import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphmovilNewComponent } from './graphmovil-new.component';

describe('GraphmovilNewComponent', () => {
  let component: GraphmovilNewComponent;
  let fixture: ComponentFixture<GraphmovilNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphmovilNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphmovilNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
