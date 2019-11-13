import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasteryComponent } from './mastery.component';

describe('MasteryComponent', () => {
  let component: MasteryComponent;
  let fixture: ComponentFixture<MasteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
