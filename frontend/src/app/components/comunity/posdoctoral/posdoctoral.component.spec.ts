import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosdoctoralComponent } from './posdoctoral.component';

describe('PosdoctoralComponent', () => {
  let component: PosdoctoralComponent;
  let fixture: ComponentFixture<PosdoctoralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosdoctoralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosdoctoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
