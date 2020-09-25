import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenumovilComponent } from './menumovil.component';

describe('MenumovilComponent', () => {
  let component: MenumovilComponent;
  let fixture: ComponentFixture<MenumovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenumovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenumovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
