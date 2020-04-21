import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfsertelcoimsComponent } from './infsertelcoims.component';

describe('InfsertelcoimsComponent', () => {
  let component: InfsertelcoimsComponent;
  let fixture: ComponentFixture<InfsertelcoimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfsertelcoimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfsertelcoimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
