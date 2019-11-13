import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProyectsComponent } from './admin-proyects.component';

describe('AdminProyectsComponent', () => {
  let component: AdminProyectsComponent;
  let fixture: ComponentFixture<AdminProyectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProyectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProyectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
