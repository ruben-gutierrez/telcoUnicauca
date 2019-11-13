import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArquitectureComponent } from './arquitecture.component';

describe('ArquitectureComponent', () => {
  let component: ArquitectureComponent;
  let fixture: ComponentFixture<ArquitectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArquitectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArquitectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
