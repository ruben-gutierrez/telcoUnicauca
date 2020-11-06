import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaopenstackmovilComponent } from './guiaopenstackmovil.component';

describe('GuiaopenstackmovilComponent', () => {
  let component: GuiaopenstackmovilComponent;
  let fixture: ComponentFixture<GuiaopenstackmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuiaopenstackmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuiaopenstackmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
