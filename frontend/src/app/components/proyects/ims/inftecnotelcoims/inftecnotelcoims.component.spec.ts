import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InftecnotelcoimsComponent } from './inftecnotelcoims.component';

describe('InftecnotelcoimsComponent', () => {
  let component: InftecnotelcoimsComponent;
  let fixture: ComponentFixture<InftecnotelcoimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InftecnotelcoimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InftecnotelcoimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
