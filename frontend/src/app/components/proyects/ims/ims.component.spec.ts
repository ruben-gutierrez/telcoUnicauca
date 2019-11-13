import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IMSComponent } from './ims.component';

describe('IMSComponent', () => {
  let component: IMSComponent;
  let fixture: ComponentFixture<IMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IMSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
