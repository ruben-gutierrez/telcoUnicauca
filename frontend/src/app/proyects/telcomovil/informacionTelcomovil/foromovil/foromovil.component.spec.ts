import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForomovilComponent } from './foromovil.component';

describe('ForomovilComponent', () => {
  let component: ForomovilComponent;
  let fixture: ComponentFixture<ForomovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForomovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForomovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
