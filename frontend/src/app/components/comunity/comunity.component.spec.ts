import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunityComponent } from './comunity.component';

describe('ComunityComponent', () => {
  let component: ComunityComponent;
  let fixture: ComponentFixture<ComunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
