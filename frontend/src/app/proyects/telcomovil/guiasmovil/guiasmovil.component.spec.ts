import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiasmovilComponent } from './guiasmovil.component';

describe('GuiasmovilComponent', () => {
  let component: GuiasmovilComponent;
  let fixture: ComponentFixture<GuiasmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiasmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiasmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
