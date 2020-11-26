import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiamaquinamovilComponent } from './guiamaquinamovil.component';

describe('GuiamaquinamovilComponent', () => {
  let component: GuiamaquinamovilComponent;
  let fixture: ComponentFixture<GuiamaquinamovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiamaquinamovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiamaquinamovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
