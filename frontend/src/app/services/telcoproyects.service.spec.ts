import { TestBed } from '@angular/core/testing';

import { TelcoproyectsService } from './telcoproyects.service';

describe('TelcoproyectsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelcoproyectsService = TestBed.get(TelcoproyectsService);
    expect(service).toBeTruthy();
  });
});
