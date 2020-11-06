import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolosmovilComponent } from './protocolosmovil.component';

describe('ProtocolosmovilComponent', () => {
  let component: ProtocolosmovilComponent;
  let fixture: ComponentFixture<ProtocolosmovilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolosmovilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolosmovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
