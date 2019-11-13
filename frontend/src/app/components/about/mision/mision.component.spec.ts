import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionComponent } from './mision.component';

describe('MisionComponent', () => {
  let component: MisionComponent;
  let fixture: ComponentFixture<MisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
